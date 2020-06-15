
#include <Funken.h> //Funken library
#include <Wire.h>
#include "rgb_lcd.h" // https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight/archive/master.zip

#define BLUE 3
#define GREEN 5
#define RED 6
Funken fnk;
const int buttonIn = 2;
const int lightIn = A1;
const int rotaryIn = A0;

int redValue;
int greenValue;
int blueValue;

float currentTemperatureValue;

int rotaryValue;
int lightValue;
int buttonValue;

// LCD Display
rgb_lcd lcd;

unsigned long lastSent = 0;
int updateSerial = 50; // interval to send value via serial port

void setup() {
  // put your setup code here, to run once:
  fnk.begin(9600, 0, 0);
  fnk.listenTo("CONTROL", control);

  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);

  //Input Components
  pinMode(buttonIn, INPUT);

  //Output Components
  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(BLUE, OUTPUT);
}


void loop() {

  fnk.hark();

  rotaryValue = analogRead(rotaryIn);
  lightValue = analogRead(lightIn);
  buttonValue = digitalRead(buttonIn);

  analogWrite(RED, redValue);
  analogWrite(BLUE, blueValue);
  analogWrite(GREEN, greenValue);


  // put your main code here, to run repeatedly:
  if ((millis() - lastSent) > updateSerial) {

    // message looks like this: "value1 value2 ..."
    // finish message with a line feed > last message with "Serial.println()" instead of "Serial.print()"

    // print sensor value
    Serial.print(rotaryValue);
    // SPACE
    Serial.print(" ");
    // print light sensor value
    Serial.print(lightValue);
    // SPACE
    Serial.print(" ");
    // print button value
    Serial.println(buttonValue);
    // update timestamp last sent
    lastSent = millis();

  }
}

void control(char *c) {

  // get first argument
  char *token = fnk.getToken(c); // is needed for library to work properly, but can be ignored

  // read RGB Values
  redValue = atoi(fnk.getArgument(c));
  greenValue = atoi(fnk.getArgument(c));
  blueValue = atoi(fnk.getArgument(c));

  // current temperature
  currentTemperatureValue = atof(fnk.getArgument(c));

  // print (show) text on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temperature:");
  lcd.setCursor(0, 1);
  lcd.print(currentTemperatureValue);


}
