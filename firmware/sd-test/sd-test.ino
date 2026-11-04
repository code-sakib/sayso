// SaySo badge, step 2: check the microSD card on the Sense board.
// Send "t" over USB and the board mounts the card, writes a test file the size of about two
// minutes of audio, reads it back, checks every byte, deletes it, and prints how fast it went.
// Send "m" to try the card in SD mode instead of SPI. Send "f" to format the card (FAT32) if it will not mount. Every report ends with a "DONE" line.

#include <SD.h>
#include <SD_MMC.h>
#include <SPI.h>

// The Sense board's card slot shares GPIO21 with the yellow light, so the light stays unused here
const int SD_CS_PIN = 21;
// Fastest first; older cards often only answer at the slower speeds
const uint32_t SD_CLOCKS_HZ[] = {20000000, 4000000, 1000000};
const char *TEST_PATH = "/sayso-test.bin";
const size_t BLOCK_BYTES = 4096;
const int TEST_BLOCKS = 1024;  // 4 MB, about two minutes of 16 kHz 16-bit audio
// Audio arrives at 32 KB/s, so the card must keep well ahead of that, even on its slowest write
const float AUDIO_KB_PER_SEC = 32.0;

uint8_t block[BLOCK_BYTES];

void fillBlock(int index) {
  for (size_t i = 0; i < BLOCK_BYTES; i++) block[i] = (uint8_t)(i * 31 + index * 7);
}

bool mountCard(bool formatIfNeeded) {
  for (uint32_t clockHz : SD_CLOCKS_HZ) {
    SD.end();
    if (SD.begin(SD_CS_PIN, SPI, clockHz, "/sd", 5, formatIfNeeded)) {
      Serial.printf("MOUNTED at %lu MHz\n", (unsigned long)(clockHz / 1000000));
      return true;
    }
    Serial.printf("no answer at %lu MHz\n", (unsigned long)(clockHz / 1000000));
  }
  return false;
}

void describeCard() {
  const char *types[] = {"none", "MMC", "SD", "SDHC", "unknown"};
  const uint8_t type = SD.cardType();
  Serial.printf("CARD type=%s size=%.1fGB free=%.1fGB\n", types[min((int)type, 4)],
                SD.cardSize() / 1e9, (SD.totalBytes() - SD.usedBytes()) / 1e9);
}

void speedTest() {
  File file = SD.open(TEST_PATH, FILE_WRITE);
  if (!file) {
    Serial.println("ERROR could not create a file on the card");
    return;
  }
  unsigned long slowestMs = 0;
  const unsigned long started = millis();
  for (int i = 0; i < TEST_BLOCKS; i++) {
    fillBlock(i);
    const unsigned long t = millis();
    if (file.write(block, BLOCK_BYTES) != BLOCK_BYTES) {
      Serial.printf("ERROR write failed at block %d\n", i);
      file.close();
      return;
    }
    slowestMs = max(slowestMs, millis() - t);
  }
  file.close();
  const float writeSec = (millis() - started) / 1000.0;

  file = SD.open(TEST_PATH, FILE_READ);
  int badBlocks = 0;
  uint8_t readBack[BLOCK_BYTES];
  for (int i = 0; i < TEST_BLOCKS; i++) {
    fillBlock(i);
    if (file.read(readBack, BLOCK_BYTES) != BLOCK_BYTES || memcmp(readBack, block, BLOCK_BYTES) != 0) badBlocks++;
  }
  file.close();
  SD.remove(TEST_PATH);

  const float kbPerSec = TEST_BLOCKS * BLOCK_BYTES / 1024.0 / writeSec;
  Serial.printf("WRITE %.0f KB/s (audio needs %.0f KB/s), slowest single write %lu ms\n", kbPerSec, AUDIO_KB_PER_SEC, slowestMs);
  Serial.printf("VERIFY %s (%d bad blocks of %d)\n", badBlocks == 0 ? "ok" : "FAILED", badBlocks, TEST_BLOCKS);
}

void runTest() {
  if (!mountCard(false)) {
    Serial.println("ERROR card did not mount (missing, loose, or not FAT32). Send f to format it.");
    return;
  }
  describeCard();
  speedTest();
}

void formatCard() {
  Serial.println("FORMAT starting, this erases the card");
  if (!mountCard(true)) {
    Serial.println("ERROR could not format: check the card is pushed fully into the slot");
    return;
  }
  describeCard();
}

// The same slot can also be driven in SD mode (how phones talk to cards): CLK=7, CMD=9, D0=8, D3=21
void sdModeProbe() {
  SD.end();
  SPI.end();
  pinMode(SD_CS_PIN, INPUT_PULLUP);
  pinMode(8, INPUT_PULLUP);
  pinMode(9, INPUT_PULLUP);
  if (!SD_MMC.setPins(7, 9, 8)) {
    Serial.println("ERROR could not set SD mode pins");
    return;
  }
  if (!SD_MMC.begin("/sdcard", true, false, 400)) {
    Serial.println("SDMODE no answer either");
    return;
  }
  Serial.printf("SDMODE card answered: type=%d size=%.1fGB\n", SD_MMC.cardType(), SD_MMC.cardSize() / 1e9);
  SD_MMC.end();
}

void setup() {
  Serial.begin(115200);
  Serial.println("READY send t to test the card, f to format it");
}

void loop() {
  if (!Serial.available()) return;
  const char command = Serial.read();
  if (command == 't') runTest();
  else if (command == 'f') formatCard();
  else if (command == 'm') sdModeProbe();
  else return;
  Serial.println("DONE");
}
