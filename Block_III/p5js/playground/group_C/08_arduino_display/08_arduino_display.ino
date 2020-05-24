// Get the LCD Library here: https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight/archive/master.zip or find it in the playground folder.
// Add with Sketch -> Include Library -> Add .zip Library

#include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;


const int tempSensor = A0; // The tempSensor uses an analog input
const int B = 3975; // Needed for the temp sensor. You should not change that.
const unsigned char colors[] = {REG_RED, REG_GREEN, REG_BLUE};

// custom character: https://www.arduino.cc/en/Reference/LiquidCrystalCreateChar
// Characters are made up of 5x8 pixels. The array has 8 rows, each starting with 0b.
// After that, you can specify your pixels: 00000: all off, 11111: all on, 01110: middle 3 on.
byte heart[8] = {
    0b00000,
    0b01010,
    0b11111,
    0b11111,
    0b11111,
    0b01110,
    0b00100,
    0b00000
};


void setup() {
  lcd.begin(16, 2); // set up the LCD's number of columns and rows:
  lcd.createChar(0, heart); // Add the heart to the custom character set
  pinMode(tempSensor, INPUT);
}

void loop() {
  lcd.display(); // Turn display on
  lcd.setCursor(0, 0); // Set cursor to (first row, first position)
  lcd.setPWM(REG_RED, 0); // Turn off red led
  lcd.setPWM(REG_GREEN, 0); // Turn off green led
  lcd.setPWM(REG_BLUE, 0); // Turn off blue led

  lcd.setPWM(colors[random(0,2)], 254); // Pick a random color and set it to max (0 - 254 allowed)

  // Print stuff
  lcd.print("I ");
  lcd.write((unsigned char)0); // This is how you use the custom char
  lcd.print(" Augsburg!");

  delay(1000); // Wait a second
  lcd.clear(); // Clear the screen
  
  delay(500); // Wait half a second
  lcd.noDisplay(); // Don't show anything

  delay(1000); // Wait a second, then restart loop
}
