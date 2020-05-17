// use one of these analog sensors from your Grove Kit
// https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/
// https://wiki.seeedstudio.com/Grove-Light_Sensor/
// https://wiki.seeedstudio.com/Grove-Temperature_Sensor/ > look at code example
// https://wiki.seeedstudio.com/Grove-Sound_Sensor/ > look at code example

// use one of these digital actuators from your Grove Kit
// https://wiki.seeedstudio.com/Grove-LED_Socket_Kit/
// https://wiki.seeedstudio.com/Grove-Relay/ > do not connect 220V devices!!!

// These constants won't change. They're used to give names to the pins used:
const int analogInPin = 0; // or A0  // digital input pin that the sensor is attached to
const int analogOutPin = 6;  // analog output pin (PWM) that the actuator is attached to (PWM just works on pin 3,5,6,9,10,11)

int sensorValue = 0;        // value read from sensor
int pwmValue = 0;           // pwm value used to drive actuator

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  
  // for analog input + output pin no initialization as an input needed !
}

void loop() {
  
  // read the analog pin
  sensorValue = analogRead(analogInPin);
  
  // map value
  pwmValue = map(sensorValue,0,1023,0,255); // change range for sensor value for different sensors (rotary, light, ...)

  // print the results to the Serial Monitor:
  Serial.println(sensorValue); // if you use a rotary angly sensor (potentiometer) you should get values between '0' or '1023'

  // switch digital actuator on/off
  analogWrite(analogOutPin,pwmValue);
  
}
