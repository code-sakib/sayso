// SaySo badge: records the wearer's conversations and sends them to the SaySo server over Wi-Fi.
//
// The PDM microphone records non-stop into 1-minute WAV pieces held in PSRAM. A second task uploads
// each piece to POST /api/badges/<id>/recordings with its start time, so the server lines it up with
// the rest of the day. If Wi-Fi drops, pieces wait in memory (about 4 minutes' worth) and the oldest
// is dropped first once memory is full. No SD card is used yet (see docs/hardware.md).
//
// The red light (D1) is on while recording. Holding the button (D0, wired to 3V3) for 2 seconds puts the
// badge into deep sleep; a press wakes it, and it starts again from the top. The minute being recorded
// when it sleeps is lost.
//
// Pieces go over HTTPS to the hosted SaySo server (SERVER_URL), so the badge works on any Wi-Fi with
// internet, such as a phone hotspot. The button also works while it is still looking for Wi-Fi.
//
// Settings (Wi-Fi, server, badge id, token) live in secrets.h, which git ignores.

#include <ESP_I2S.h>
#include <driver/rtc_io.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <time.h>
#include "secrets.h"

// Microphone (wired on the Sense board)
const int MIC_CLOCK_PIN = 42;
const int MIC_DATA_PIN = 41;
const int SAMPLE_RATE = 16000;
// The raw mic is quiet; this lifts speech without clipping normal talking
const float MIC_GAIN = 4.0;
// High-pass filter that removes the mic's constant offset (about 20 Hz cut-off)
const float DC_BLOCK = 0.995;

// Pieces: 1 minute each. One recording + one uploading + two waiting = about 7.7 MB of the 8 MB PSRAM
const int PIECE_SECONDS = 60;
const size_t WAV_HEADER_BYTES = 44;
const size_t PIECE_AUDIO_BYTES = (size_t)SAMPLE_RATE * 2 * PIECE_SECONDS;
const int WAITING_PIECES = 2;

const int LIGHT_PIN = 2;     // D1: red recording light, on (HIGH) while recording
const int BUTTON_PIN = 1;    // D0: the button joins it to 3V3, so pressed reads HIGH
const gpio_num_t BUTTON_GPIO = GPIO_NUM_1;
const unsigned long SLEEP_HOLD_MS = 2000;
const unsigned long WIFI_WAIT_MS = 20000;
const unsigned long RETRY_MS = 5000;
const int HTTP_TIMEOUT_MS = 30000;
const char *TIME_ZONE = "IST-5:30";  // store-local time, India

struct Piece {
  uint8_t *wav;          // header + audio
  char startedAt[20];    // "2026-11-02T18:40:05"
};

I2SClass mic;
QueueHandle_t waiting;
volatile unsigned long uploadedCount = 0;
volatile unsigned long droppedCount = 0;

void writeWavHeader(uint8_t *h, uint32_t audioBytes) {
  const uint32_t byteRate = SAMPLE_RATE * 2;
  const uint32_t riffSize = audioBytes + 36;
  memcpy(h, "RIFF", 4);
  memcpy(h + 4, &riffSize, 4);
  memcpy(h + 8, "WAVEfmt ", 8);
  const uint32_t fmtSize = 16;
  const uint16_t pcm = 1, channels = 1, blockAlign = 2, bits = 16;
  const uint32_t rate = SAMPLE_RATE;
  memcpy(h + 16, &fmtSize, 4);
  memcpy(h + 20, &pcm, 2);
  memcpy(h + 22, &channels, 2);
  memcpy(h + 24, &rate, 4);
  memcpy(h + 28, &byteRate, 4);
  memcpy(h + 32, &blockAlign, 2);
  memcpy(h + 34, &bits, 2);
  memcpy(h + 36, "data", 4);
  memcpy(h + 40, &audioBytes, 4);
}

void freePiece(Piece *piece) {
  free(piece->wav);
  delete piece;
}

/** Drops the oldest waiting piece to make room. Only happens after minutes without Wi-Fi. */
void dropOldest() {
  Piece *oldest;
  if (xQueueReceive(waiting, &oldest, 0) == pdTRUE) {
    Serial.printf("DROP piece from %s (no Wi-Fi for too long)\n", oldest->startedAt);
    freePiece(oldest);
    droppedCount++;
  }
}

Piece *newPiece() {
  Piece *piece = new Piece();
  while (!(piece->wav = (uint8_t *)ps_malloc(WAV_HEADER_BYTES + PIECE_AUDIO_BYTES))) {
    dropOldest();
    vTaskDelay(pdMS_TO_TICKS(10));
  }
  struct tm now;
  getLocalTime(&now, 0);
  strftime(piece->startedAt, sizeof(piece->startedAt), "%Y-%m-%dT%H:%M:%S", &now);
  return piece;
}

/** Records forever, one piece at a time, and hands each full piece to the uploader. */
void recordTask(void *) {
  int16_t samples[512];
  // Start the filter from the mic's first reading so the very first sample doesn't jump to full scale
  mic.readBytes((char *)samples, 2);
  float lastIn = samples[0], lastOut = 0;
  digitalWrite(LIGHT_PIN, HIGH);
  while (true) {
    Piece *piece = newPiece();
    int16_t *audio = (int16_t *)(piece->wav + WAV_HEADER_BYTES);
    size_t filled = 0;
    const size_t total = PIECE_AUDIO_BYTES / 2;
    while (filled < total) {
      const size_t want = min((size_t)512, total - filled);
      const size_t got = mic.readBytes((char *)samples, want * 2) / 2;
      for (size_t i = 0; i < got; i++) {
        const float in = samples[i];
        lastOut = in - lastIn + DC_BLOCK * lastOut;
        lastIn = in;
        audio[filled + i] = (int16_t)constrain(lastOut * MIC_GAIN, -32768.0f, 32767.0f);
      }
      filled += got;
    }
    writeWavHeader(piece->wav, PIECE_AUDIO_BYTES);
    if (uxQueueSpacesAvailable(waiting) == 0) dropOldest();
    xQueueSend(waiting, &piece, portMAX_DELAY);
    Serial.printf("REC piece ready, started %s\n", piece->startedAt);
  }
}

bool upload(const Piece *piece) {
  if (WiFi.status() != WL_CONNECTED) return false;
  // Encrypted, but the server's certificate is not checked: fine for the demo, pin it before real stores
  WiFiClientSecure tls;
  tls.setInsecure();
  HTTPClient http;
  const String url = String(SERVER_URL) + "/api/badges/" + BADGE_ID + "/recordings?startedAt=" + piece->startedAt;
  http.begin(tls, url);
  http.setTimeout(HTTP_TIMEOUT_MS);
  http.addHeader("Authorization", String("Bearer ") + BADGE_TOKEN);
  http.addHeader("Content-Type", "audio/wav");
  const int code = http.POST(piece->wav, WAV_HEADER_BYTES + PIECE_AUDIO_BYTES);
  if (code == 201) {
    Serial.printf("UPLOAD ok, piece from %s\n", piece->startedAt);
  } else {
    Serial.printf("UPLOAD failed (%d): %s\n", code, code > 0 ? http.getString().c_str() : http.errorToString(code).c_str());
  }
  http.end();
  return code == 201;
}

/** Sends waiting pieces one by one, retrying the same piece until the server takes it. */
void uploadTask(void *) {
  while (true) {
    Piece *piece;
    xQueueReceive(waiting, &piece, portMAX_DELAY);
    while (!upload(piece)) vTaskDelay(pdMS_TO_TICKS(RETRY_MS));
    freePiece(piece);
    uploadedCount++;
  }
}

/** Network names with the curly apostrophe phones use (’) and the plain one (') count as the same. */
String plainName(String name) {
  name.replace("\xE2\x80\x99", "'");
  name.replace("\xE2\x80\x98", "'");
  return name;
}

/** The exact name of the nearby network that matches WIFI_SSID, or WIFI_SSID itself if none is seen. */
String findNetwork() {
  const String wanted = plainName(WIFI_SSID);
  const int count = WiFi.scanNetworks();
  String match = WIFI_SSID;
  bool isSeen = false;
  for (int i = 0; i < count; i++) {
    if (plainName(WiFi.SSID(i)) == wanted) {
      match = WiFi.SSID(i);
      isSeen = true;
      break;
    }
  }
  WiFi.scanDelete();
  Serial.printf("SCAN %d networks nearby, yours %s\n", count, isSeen ? "seen" : "NOT seen (is it on, and 2.4 GHz?)");
  return match;
}

bool connectWifi() {
  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.disconnect();  // stop the last attempt before starting a new one
  WiFi.begin(findNetwork().c_str(), WIFI_PASSWORD);
  const unsigned long until = millis() + WIFI_WAIT_MS;
  while (WiFi.status() != WL_CONNECTED && millis() < until) {
    if (isLongPress()) goToSleep();  // let the wearer switch off while it searches
    delay(20);
  }
  if (WiFi.status() != WL_CONNECTED) return false;
  Serial.printf("WIFI connected to %s, badge address %s\n", WIFI_SSID, WiFi.localIP().toString().c_str());
  return true;
}

/** Waits for the real time from the internet: every piece needs a correct start time. */
void syncClock() {
  configTzTime(TIME_ZONE, "pool.ntp.org", "time.google.com");
  struct tm now;
  while (!getLocalTime(&now, 5000)) Serial.println("TIME waiting for the internet clock…");
  char text[20];
  strftime(text, sizeof(text), "%Y-%m-%dT%H:%M:%S", &now);
  Serial.printf("TIME %s\n", text);
}

/** Light off, wait for the button to be let go, then sleep until the next press. */
void goToSleep() {
  digitalWrite(LIGHT_PIN, LOW);
  Serial.println("SLEEP (press the button to wake)");
  while (digitalRead(BUTTON_PIN) == HIGH) delay(20);
  delay(100);
  Serial.flush();
  // Keep D0 pulled low while asleep, so only a press (3V3) wakes the badge
  rtc_gpio_pullup_dis(BUTTON_GPIO);
  rtc_gpio_pulldown_en(BUTTON_GPIO);
  esp_sleep_enable_ext0_wakeup(BUTTON_GPIO, 1);
  esp_deep_sleep_start();
}

/** True once the button has been held down for SLEEP_HOLD_MS. */
bool isLongPress() {
  static unsigned long pressedSince = 0;
  if (digitalRead(BUTTON_PIN) == LOW) {
    pressedSince = 0;
    return false;
  }
  if (pressedSince == 0) pressedSince = millis();
  return millis() - pressedSince >= SLEEP_HOLD_MS;
}

void setup() {
  Serial.begin(115200);
  pinMode(LIGHT_PIN, OUTPUT);
  digitalWrite(LIGHT_PIN, LOW);
  pinMode(BUTTON_PIN, INPUT_PULLDOWN);
  delay(1500);
  const bool isWake = esp_sleep_get_wakeup_cause() == ESP_SLEEP_WAKEUP_EXT0;
  Serial.printf("SaySo badge %s starting%s\n", BADGE_ID, isWake ? " (woken by the button)" : "");

  while (!connectWifi()) Serial.printf("WIFI could not join %s, trying again (is it 2.4 GHz?)\n", WIFI_SSID);
  syncClock();

  mic.setPinsPdmRx(MIC_CLOCK_PIN, MIC_DATA_PIN);
  if (!mic.begin(I2S_MODE_PDM_RX, SAMPLE_RATE, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO)) {
    while (true) {
      Serial.println("ERROR microphone did not start");
      delay(1000);
    }
  }

  waiting = xQueueCreate(WAITING_PIECES, sizeof(Piece *));
  xTaskCreatePinnedToCore(recordTask, "record", 8192, nullptr, 3, nullptr, 1);
  xTaskCreatePinnedToCore(uploadTask, "upload", 16384, nullptr, 1, nullptr, 0);  // HTTPS needs the room
  Serial.println("RECORDING");
}

void loop() {
  static unsigned long lastReport = 0;
  if (isLongPress()) goToSleep();
  if (millis() - lastReport > 30000) {
    lastReport = millis();
    Serial.printf("STATUS wifi=%s uploaded=%lu dropped=%lu waiting=%u free_psram=%u\n",
                  WiFi.status() == WL_CONNECTED ? "on" : "off", uploadedCount, droppedCount,
                  (unsigned)uxQueueMessagesWaiting(waiting), (unsigned)ESP.getFreePsram());
  }
  delay(20);
}
