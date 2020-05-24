// On Arduino, upload the Example "09_connect_arduino_and_p5/09_connect_arduino_and_p5.ino"
// add the Library "libraries/p5.serialport.js" in the index.html
// also add "libraries/serial.js" which contains callback functions for "p5.serialport.js"

let serial; // variable to hold an instance of the serialport library
let latestData = ""; // Incoming data, empty in the beginning.


// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
}

// setup
function setup() {
  // canvas
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // serial.open("COM5"); // fill in your serial port name here, find it in p5.serialcontrol under "Connect"
  serial.open("/dev/tty.usbmodem1301"); // On Mac it may be something like this

  // Here are the callbacks that you can register > see also "libraries/serial.js"
  serial.on('connected', serverConnected); // When we connect to the underlying server  
  serial.on('list', gotList); // When we get a list of serial ports that are available
  serial.on('data', gotData); // When we get some data from the serial port
  serial.on('error', gotError); // When or if we get an error
  serial.on('open', gotOpen); // When our serial port is opened and ready for read/write
  serial.on('close', gotClose);
  //serial.on('rawdata', gotRawData); // Callback to get the raw data, as it comes in for handling yourself
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

// draw
function draw() {  
  let receivedValues = split(latestData, " "); // for now just one value is sent from Arduino, but if you send multiple data values, you can split them into an array
  let brightness = map(receivedValues[0], 0, 760, 0, 255);
  
  // Backgorund
  background(180, 80, 10);
  
  // Bulb
  fill(55, 255, brightness);
  rect(width/2, height/2 + 80, 100, 180, 32);
  strokeWeight(10);
  stroke(180, 80, 10);
  ellipse(width/2, height/2, 200);


  // Text
  noStroke();
  fill(0, 0, 255);
  textLeading(10);
  textSize(50);

  text(receivedValues[0] + "\nlm", width / 2, height / 2);
}