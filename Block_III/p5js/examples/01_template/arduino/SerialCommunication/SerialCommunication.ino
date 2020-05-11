// These constants won't change. They're used to give names to the pins used:
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogOutPin = 3; // Analog output pin that the LED is attached to

int sensorValue = 0;        // value read from the pot
int outputValue = 0;        // value output to the PWM (analog out)

int incomingByte; // variable for reading from serial port - from p5.js 

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}

void loop() {
  // read the analog in value:
  sensorValue = analogRead(analogInPin);

  // print the results to the Serial Monitor:
  Serial.println(sensorValue);

  // wait 2 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:
  delay(2);

  if (Serial.available() > 0) {   // see if there's incoming serial data
    incomingByte = Serial.read(); // read it

    // map it to the range of the analog out:
    outputValue = map(incomingByte, 0, 1023, 0, 255);
    // change the analog out value:
    analogWrite(analogOutPin, outputValue);   
  }
}
