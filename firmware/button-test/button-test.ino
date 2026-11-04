// SaySo badge: check the button is wired to D0 and 3V3.
// The red light stays on while the button is held, and every press and release is printed over USB.
const int BUTTON_PIN = 1;  // D0; the button joins it to 3V3, so pressed reads HIGH
const int LIGHT_PIN = 2;   // D1
const unsigned long DEBOUNCE_MS = 30;

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLDOWN);
  pinMode(LIGHT_PIN, OUTPUT);
  Serial.println("READY press the button");
}

void loop() {
  static bool wasPressed = false;
  const bool isPressed = digitalRead(BUTTON_PIN) == HIGH;
  if (isPressed != wasPressed) {
    wasPressed = isPressed;
    digitalWrite(LIGHT_PIN, isPressed ? HIGH : LOW);
    Serial.println(isPressed ? "BUTTON pressed" : "BUTTON released");
    delay(DEBOUNCE_MS);
  }
}
