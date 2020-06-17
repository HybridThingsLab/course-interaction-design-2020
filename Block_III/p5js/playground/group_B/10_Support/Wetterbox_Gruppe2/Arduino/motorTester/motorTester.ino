int speedPin = 9; // connect to D8 of Grove Kit!!!
int analogInPin = 0; // or A0  // digital input pin that the sensor is attached to

int sensorValue = 0;
int speedValue = 0;

void setup() {
}

void loop() {

  // read sensor on analog in (for example rotary angle sensor)
  sensorValue = analogRead(analogInPin);

  // map sensor value to speed (sensor: 0-1023 to PWM/Speed: 0-255)
  // just for testing (value between 0 and 255 needed)
  speedValue = map(sensorValue,0,1023,0,255);

  // set speed motor (PWM)
    analogWrite(speedPin, speedValue);
}
