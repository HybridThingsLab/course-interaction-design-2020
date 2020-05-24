// Just a simple blink example. Note that the long kathode of the LED goes into the + and the short one goes into the -.

const int ledPin = 2;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
    digitalWrite(ledPin, HIGH);
    delay(2000);
    digitalWrite(ledPin, LOW);
    delay(2000);
}
