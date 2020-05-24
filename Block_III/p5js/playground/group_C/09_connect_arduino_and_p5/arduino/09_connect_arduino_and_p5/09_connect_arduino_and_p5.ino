const int lightSensor = A0;
unsigned long lastSent = 0;

void setup() {
  Serial.begin(9600);
  pinMode(lightSensor, INPUT);
}

void loop() {
  if( (millis() - lastSent) > 300) {
    Serial.println( analogRead(lightSensor) );
    lastSent = millis();
  }
}
