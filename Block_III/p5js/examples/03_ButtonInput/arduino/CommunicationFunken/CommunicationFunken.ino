// import of Funken
// Download ths Funken library here: https://github.com/astefas/Funken/tree/master/bin
// Install with Skecth > Include Library > Add .ZIP Library 
#include <Funken.h>

// instantiation of Funken
Funken fnk;

const int potentiometerPin = A0;  // Analog input pin that the potentiometer is attached to
const int ledPin = 3; // Analog output pin that the LED is attached to
const int buzzerPin = 4; // Analog output pin that the LED is attached to
int potentiometerValue = 0;     // value read from the pot
unsigned long lastSent = 0;

/*
   THE SETUP
*/
void setup() {

  // init funken
  fnk.begin(9600, 0, 0); // higher baudrate for better performance
  fnk.listenTo("WHATEVER", whatever);
}

/*
   THE LOOP
*/
void loop() {
  // needed to make FUNKEN work
  fnk.hark();

  // Do not try to send Serial stuff too often, be prevent this by checking when we sent the last time
  if((millis() - lastSent) > 100){
    // read the analog in value:
    potentiometerValue = analogRead(potentiometerPin);
    // print the results to the Serial Monitor:
    Serial.print(potentiometerValue);
    Serial.print(" ");
    Serial.println(random(0,100));
    lastSent = millis();
  }
}

void whatever(char *c) {

  // get first argument
  char *token = fnk.getToken(c); // is needed for library to work properly, but can be ignored

  int receivedTemperature = atoi(fnk.getArgument(c));
  analogWrite(ledPin, receivedTemperature);
  
  int receivedPrecipitation = atoi(fnk.getArgument(c));
  if(receivedPrecipitation > 10){
    digitalWrite(buzzerPin, HIGH);
    delay(50);
    digitalWrite(buzzerPin, LOW);
  }
}
