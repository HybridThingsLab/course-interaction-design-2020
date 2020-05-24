// This is how you can make the buzzer work. Unfortunately, the buzzer has only one tone height and is pretty loud.

const int buzzPin = 2;

void setup() {
  pinMode(buzzPin, OUTPUT);
}

void loop() {
  buzz(600, 400);
  buzz(200, 200);
  buzz(200, 400);
  buzz(200, 200);
  buzz(200, 400);
  delay(4000);
}

void buzz(int forSeconds, int withPause) {
  digitalWrite(buzzPin, HIGH);
  delay(forSeconds);
  digitalWrite(buzzPin, LOW);
  delay(withPause);
}
