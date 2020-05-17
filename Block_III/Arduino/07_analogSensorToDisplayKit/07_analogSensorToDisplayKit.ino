
// use one of these analog sensors from your Grove Kit
// https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/
// https://wiki.seeedstudio.com/Grove-Light_Sensor/
// https://wiki.seeedstudio.com/Grove-Temperature_Sensor/ > look at code example
// https://wiki.seeedstudio.com/Grove-Sound_Sensor/ > look at code example

// use Grove - LCD RGB Backlight from your Grove Kit and connect it to I2C pin
// https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/
// source https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight

// libraries
#include <Wire.h>
#include "rgb_lcd.h" // https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight/archive/master.zip

// These constants won't change. They're used to give names to the pins used:
const int analogInPin = 0; // or A0  // digital input pin that the sensor is attached to

int sensorValue = 0;        // value read from sensor

// LCD Display
rgb_lcd lcd;
int colorR = 0;
int colorG = 0;
int colorB = 0;



void setup()
{
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  delay(1000);
}

void loop() {

  // read the analog pin
  sensorValue = analogRead(analogInPin);

  // set RGB backlight
  colorR = map(sensorValue, 0, 1023, 0, 255);
  lcd.setRGB(colorR, colorG, colorB);

  // print (show) text on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Sensor Value");
  lcd.setCursor(0, 1);
  lcd.print(sensorValue);

  // to slow down for LCD
  delay(100);
}
