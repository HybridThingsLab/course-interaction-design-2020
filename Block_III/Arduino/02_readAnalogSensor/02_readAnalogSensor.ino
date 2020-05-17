// use one of these analog sensors from your Grove Kit
// https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/
// https://wiki.seeedstudio.com/Grove-Light_Sensor/
// https://wiki.seeedstudio.com/Grove-Temperature_Sensor/ > look at code example
// https://wiki.seeedstudio.com/Grove-Sound_Sensor/ > look at code example

// These constants won't change. They're used to give names to the pins used:
const int analogInPin = 0; // or A0  // digital input pin that the sensor is attached to

int sensorValue = 0;        // value read from sensor


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  // for analog pin no initialization as an input needed !
}

void loop() {
  
  // read the analog pin
  sensorValue = analogRead(analogInPin);

  // print the results to the Serial Monitor:
  Serial.println(sensorValue); // if you use a rotary angly sensor (potentiometer) you should get values between '0' or '1023'
}
