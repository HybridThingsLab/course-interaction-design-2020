// This shows you how to use the sound sensor.

const int soundSensor = A0; // The tempSensor uses an analog input

void setup() {
  Serial.begin(9600); // Open the serial port at 9600bps
  pinMode(soundSensor, INPUT);
}

void loop() {
  int volume = analogRead(soundSensor); // Get the (raw) value of the sound sensor.


  Serial.print( "Current volume is " ); // Print to the serial console. This will be the main communication between the Arduino and p5.js
  Serial.print(volume);
  Serial.print( "." );
  Serial.println(); // Print a new Line
  delay(500); // !IMPORTANT! Wait half a second before reading again. Don't read inputs without this. This may crash your sketch.
}
