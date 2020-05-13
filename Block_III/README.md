# Fundamentals of Interaction Design / Grundlagen Interaktiver Gestaltung IA2

## Physical interaction with P5.js, Arduino and the Grove Starter Kit
You will learn how to sense and control things in your real world environment by connection a Arduino microcontroller to your Mac/PC, attach sensors and actuators and writing the code necessary to let all of them commmunicate.

### Get your tools
For this course you will need
* Ardunio UNO, Seedunio, Funduino UNO or similar
* USB Data Cable for your Arduino. __Attention: Many USB Cable are only for charging, not for Data!__
* [Seeed Studio Grove - Starter Kit for Arduino](https://www.seeedstudio.com/Grove-Starter-Kit-for-Arduino-p-1855.html)

### Environment
* Download and install the Arduino IDE from [Arduino.cc](https://www.arduino.cc/en/Main/Software) - on Mac, drag the software to your Applications Folder
* Connect your Arduino to your Mac/PC using a USB Cable
* Open the Arduino Software
* Set the Port in "Tools > Port", on Windows it will be something like "COM5", on MAC more like "/dev/cu.usbmodem14301"
* Select the Board you attached in "Tools > Board: ...", most definitely "Arduino Uno"
* Open a first Example in "File > Examples > 01.Basics > Blink"
* Upload the Sketch to your Board with "Sketch > Upload" or the Arrow pointing right
* The blue LED should now blink

### Attaching Modules to the Arduino
* Carrefully attach the big Grove Base Shield, so that each metal pin goes into its hole
* Set the votage selector on the switch right beside the A0 socket to "5V"
* Plug the green LED into the corresponding holes of the "LED Socket" module, the LED has a "flat" side that should point in the same direction as on the symbolic circle right below the holes
* Attach the LED Socket module to Socket D3 of the Grove Base Shield
* Attach the Rotary Angle Sensor in A0

### Websocket Server for the Communication between P5.js and Arduino
* Download the newest release of [p5.serialcontrol](https://github.com/p5-serial/p5.serialcontrol/releases)
    * For Mac you may want download "p5.serialcontrol-darwin-x64.zip" and drag it into your "Application" folder.
    * For Windows download "p5.serialcontrol-win32-x64.zip" anf copy the folder to a convenient place
* Run p5.serialcontrol
    * If Mac warns you because of the "non-verified Developer", hit "cancel", right-click the Apps Symbol > Open and the click "Open"
    * On Windows you may have to "Allow Access" when the Firewall warning pops up

### Example sketches for P5.js
In our [Examples Folder for Block III](https://github.com/HybridThingsLab/course-interaction-design/tree/master/Block_III/p5js/examples/) you can find Files p5.js files and the corresponding Code, that you have to upload to your Arduino.
For all of these Examples your p5.serialcontrol App has to be opened. But keep in mind that in order to be able to upload something to your Ardunio, you have to close this software since it occupies your serial port needed fot programming.
* [01_SendReceiveSingle](https://github.com/HybridThingsLab/course-interaction-design/tree/master/Block_III/p5js/examples/01_SendReceiveSingle) Simple, but only good to send one value (ideally a Number, 0 to 255) from P5.js to Ardino and back
* [02_SendReceiveMultiple](https://github.com/HybridThingsLab/course-interaction-design/tree/master/Block_III/p5js/examples/02_SendReceiveMultiple) Using the amazing [Funken library](https://github.com/astefas/Funken) to send all kind of variables (also text, numbers...) and also multiple of them back and forth