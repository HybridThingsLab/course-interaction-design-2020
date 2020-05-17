// use one of these digital actuators from your Grove Kit
// https://wiki.seeedstudio.com/Grove-LED_Socket_Kit/
// https://wiki.seeedstudio.com/Grove-Relay/ > do not connect 220V devices!!!

// These constants won't change. They're used to give names to the pins used:
const int digitalOutPin = 6;  // digital output pin that the actuator is attached to


void setup() {
  
  // initialize digital pin as an input:
  pinMode(digitalOutPin, OUTPUT);
  
}

void loop() {

  // delay
  delay(500);

  // digital output on (= 'HIGH' or '1')
  digitalWrite(digitalOutPin, HIGH);

  // delay
  delay(500);

  // digital output on (= 'LOW' or '0')
  digitalWrite(digitalOutPin, LOW);
  
}
