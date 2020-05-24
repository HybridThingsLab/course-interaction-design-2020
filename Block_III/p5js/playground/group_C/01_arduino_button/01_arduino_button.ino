// Works for the normal as well as the touch button of the grove kit.

const int buttonPin = 2;
const int ledPin = LED_BUILTIN;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
    if(digitalRead(buttonPin) == HIGH) {
      digitalWrite(ledPin, HIGH);
    } else {
      digitalWrite(ledPin, LOW);
    }
}
