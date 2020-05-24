// On Arduino, upload the Example "arduino/receiveDataFromP5js.ino"
// add the Library "libraries/p5.serialport.js" in the index.html
// also add "libraries/serial.js" which contains callback functions for "p5.serialport.js"

let serial; // variable to hold an instance of the serialport library


// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
}

// setup
function setup() {

  // canvas
  createCanvas(800, 800);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // serial.open("COM5"); // fill in your serial port name here, find it in p5.serialcontrol under "Connect"
  serial.open("/dev/tty.usbmodem301"); // On Mac it may be something like this

  // Here are the callbacks that you can register > see also "libraries/serial.js"
  serial.on('connected', serverConnected); // When we connect to the underlying server  
  serial.on('list', gotList); // When we get a list of serial ports that are available
  serial.on('data', gotData); // When we get some data from the serial port
  serial.on('error', gotError); // When or if we get an error
  serial.on('open', gotOpen); // When our serial port is opened and ready for read/write
  serial.on('close', gotClose);
  //serial.on('rawdata', gotRawData); // Callback to get the raw data, as it comes in for handling yourself
}

// draw
function draw() {

  // background 
  background(0);

  // Here we will send the value to Arduino, do not doo this too often, it will block your system
  // just every x frames (every 2nd frame)
  if (frameCount % 2 == 0) {

    // Write mapped mouse x position to serial port 

    let mappedMouseX = int(map(mouseX, 0, width, 0, 180));

    console.log(mappedMouseX);

    serial.write("WHATEVER");
    serial.write(" "); // If sending multiple variables, they are seperated with a blank space
    serial.write(str(mappedMouseX)); // send integer as string
    serial.write(10); // to finish your message, send a "line feed"

  }

}