// SaySo badge, step 1: check the XIAO ESP32S3 Sense microphone works.
// Send "r" over USB and the board records a few seconds from its PDM mic into PSRAM, then sends it
// back as raw 16 kHz, 16-bit mono PCM between a "BEGIN <bytes>" line and an "END" line.
// firmware/tools/record_test.py does the Mac side and saves a WAV.

#include <ESP_I2S.h>

// The Sense board wires its PDM mic to these pins
const int MIC_CLOCK_PIN = 42;
const int MIC_DATA_PIN = 41;
const int SAMPLE_RATE = 16000;
const int RECORD_SECONDS = 6;
// The mic pops and settles for a moment after it starts; throw that part away
const int SETTLE_MS = 300;
const int USER_LED_PIN = 21;  // the small yellow light, lit (LOW) while recording

I2SClass mic;

void setup() {
  Serial.begin(115200);
  pinMode(USER_LED_PIN, OUTPUT);
  digitalWrite(USER_LED_PIN, HIGH);

  mic.setPinsPdmRx(MIC_CLOCK_PIN, MIC_DATA_PIN);
  if (!mic.begin(I2S_MODE_PDM_RX, SAMPLE_RATE, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO)) {
    while (true) {
      Serial.println("ERROR mic did not start");
      delay(1000);
    }
  }
  Serial.println("READY send r to record");
}

void record() {
  const size_t bytes = (size_t)SAMPLE_RATE * 2 * RECORD_SECONDS;
  uint8_t *audio = (uint8_t *)ps_malloc(bytes);
  if (!audio) {
    Serial.println("ERROR no PSRAM for the recording");
    return;
  }

  digitalWrite(USER_LED_PIN, LOW);
  uint8_t scratch[512];
  const unsigned long settleUntil = millis() + SETTLE_MS;
  while (millis() < settleUntil) mic.readBytes((char *)scratch, sizeof(scratch));

  size_t got = 0;
  while (got < bytes) got += mic.readBytes((char *)audio + got, min((size_t)4096, bytes - got));
  digitalWrite(USER_LED_PIN, HIGH);

  Serial.printf("BEGIN %u\n", (unsigned)bytes);
  Serial.write(audio, bytes);
  Serial.println();
  Serial.println("END");
  free(audio);
}

void loop() {
  if (Serial.available() && Serial.read() == 'r') record();
}
