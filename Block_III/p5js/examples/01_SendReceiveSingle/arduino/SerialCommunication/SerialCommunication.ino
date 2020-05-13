#include <Servo.h> // This is a library included in Arduino to control a Servo
Servo myservo;  // create servo object to control a servo

// These constants won't change. They're used to give names to the pins used:
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to

int sensorValue = 0;        // value read from the pot
int servoOutputValue = 0;        // value to output to the Servo

int incomingByte; // variable for reading from serial port - from p5.js 

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  myservo.attach(6);  // attaches the Servo on Pin 6 to the Servo object
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
    servoOutputValue = map(incomingByte, 0, 1023, 0, 180);
    myservo.write(servoOutputValue);
  }
}
