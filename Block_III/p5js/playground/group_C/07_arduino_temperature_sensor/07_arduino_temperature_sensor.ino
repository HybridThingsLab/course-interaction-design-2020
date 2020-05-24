// This shows you how to use the temperature sensor. It can give you the current temperature in Cº, but you need to do the conversion first.

const int tempSensor = A0; // The tempSensor uses an analog input
const int B = 3975; // Needed for the temp sensor. You should not change that.

void setup() {
  Serial.begin(9600); // Open the serial port at 9600bps
  pinMode(tempSensor, INPUT);
}

void loop() {
  // Get the (raw) value of the temperature sensor.
  int val = analogRead(tempSensor);
  
  // Determine the current resistance of the thermistor based on the sensor value.
  float resistance = (float)(1023-val)*10000/val;
  
  // Calculate the temperature based on the resistance value.
  float temperature = 1/(log(resistance/10000)/B+1/298.15)-273.15;

  Serial.print( "It's " ); // Print to the serial console. This will be the main communication between the Arduino and p5.js
  Serial.print(temperature);
  Serial.print( "Cº here." );
  Serial.println(); // Print a new Line
  delay(500); // !IMPORTANT! Wait half a second before reading again. Don't read inputs without this. This may crash your sketch.
}
