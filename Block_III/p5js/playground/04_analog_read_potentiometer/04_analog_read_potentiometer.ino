// This shows you how to read values and output them to the Serial console.

const int potentiometerPin = A0; // The potentiometer uses an analog input

void setup() {
  Serial.begin(9600); // Open the serial port at 9600bps
  pinMode(potentiometerPin, INPUT);
}

void loop() {
  Serial.print( "Potentiometer is set to " ); // Print to the serial console. This will be the main communication between the Arduino and p5.js
  Serial.print( analogRead(potentiometerPin) ); // Don't mix Strings and Ints: Serial.print("String " + analogRead(...) )
  Serial.println(); // Print a new Line
  delay(500); // !IMPORTANT! Wait half a second before reading again. Don't read inputs without this. This may crash your sketch.
}
