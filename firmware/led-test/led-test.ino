// SaySo badge: check the red recording light before soldering it.
// Push the resistor's free end into the D1 hole and the LED's short (−) leg into the GND hole,
// then plug in USB. The light blinks once a second.

const int LIGHT_PIN = 2;  // D1
const unsigned long BLINK_MS = 500;

void setup() {
  Serial.begin(115200);
  pinMode(LIGHT_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LIGHT_PIN, HIGH);
  Serial.println("LIGHT on");
  delay(BLINK_MS);
  digitalWrite(LIGHT_PIN, LOW);
  delay(BLINK_MS);
}
