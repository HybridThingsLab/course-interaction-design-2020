// use one of these digital sensors from your Grove Kit
// https://wiki.seeedstudio.com/Grove-Button/
// https://wiki.seeedstudio.com/Grove-Touch_Sensor/

// use one of these digital actuators from your Grove Kit
// https://wiki.seeedstudio.com/Grove-LED_Socket_Kit/
// https://wiki.seeedstudio.com/Grove-Relay/ > do not connect 220V devices!!!

// These constants won't change. They're used to give names to the pins used:
const int digitalInPin = 2;  // digital input pin that the sensor is attached to
const int digitalOutPin = 6;  // digital output pin that the actuator is attached to

int sensorValue = 0;        // value read from sensor


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  
  // initialize digital pin as an input:
  pinMode(digitalInPin, INPUT);
  
  // initialize digital pin as an output:
  pinMode(digitalOutPin, OUTPUT);
}

void loop() {
  
  // read the digital pin
  sensorValue = digitalRead(digitalInPin);

  // print the results to the Serial Monitor:
  Serial.println(sensorValue); // you should get '0' or '1'

  // switch digital actuator on/off
  digitalWrite(digitalOutPin,sensorValue);
  
}
