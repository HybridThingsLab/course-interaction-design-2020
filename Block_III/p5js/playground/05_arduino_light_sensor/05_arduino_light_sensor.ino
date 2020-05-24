// This shows you how to use the light sensor. The range is between 0 and 750.

const int lightSensor = A0; // The light Sensor uses an analog input

void setup() {
  Serial.begin(9600); // Open the serial port at 9600bps
  pinMode(lightSensor, INPUT);
}

void loop() {
  Serial.print( "It's " ); // Print to the serial console. This will be the main communication between the Arduino and p5.js
  Serial.print( lightLevel( analogRead(lightSensor) ) ); // Don't mix Strings and Ints: Serial.print("String " + analogRead(...) )
  Serial.print( " here." );
  Serial.println(); // Print a new Line
  delay(500); // !IMPORTANT! Wait half a second before reading again. Don't read inputs without this. This may crash your sketch.
}

String lightLevel(int light) {
  if( light < 20 ) {
    return "pitch dark";
  } else if (light <= 50) {
    return "very dark";
  } else if (light <= 95) {
    return "indoors";
  } else if (light <= 145) {
    return "a corridor";
  } else if (light <= 195) {
    return "a rest room";
  } else if (light <= 295) {
    return "bright";
  } else  if (light <= 325) {
    return "very bright";
  } else {
    return "too bright";
  }
}
