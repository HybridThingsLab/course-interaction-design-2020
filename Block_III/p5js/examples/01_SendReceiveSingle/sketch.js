// On Arduino, upload the Example "arduino/SerialCommunication.ino"
// I added the Library "libraries/p5.serialport.js" in the index.html

let file, data;

let serial;   // variable to hold an instance of the serialport library
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

let millisLastSent = 0;
let currentIndex = 0;


// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
  // file = loadJSON("data/DWD-Augsburg-2009-2019.json");
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");
}

// setup
function setup() {
  data = file.data
  // canvas
  createCanvas(800, 800);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  serial.open("COM5"); // fill in your serial port name here, find it in p5.serialcontrol under "Connect"
  //serial.open("/dev/tty.usbmodem14301"); // On Mac it may be something like this

  // Here are the callbacks that you can register
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
  background(0)

  // Write the last data that was coming in
  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("latestData: " + latestData, width / 2, height / 2 + 50);

  // Obtain the date and a value from your data at the index we will count upwards
  let currentDate = data[currentIndex].MESS_DATUM;
  let temperature = data[currentIndex].TMK;
  // Write the date and the current data
  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(currentDate + ": " + temperature, width / 2, height / 2);

  // Here we will send the value to Arduino, do not doo this too often, it will block your system
  // Therefor we will only do this every some milliseconds
  let millisNow = millis();
  if(millisNow - millisLastSent > 100){
    // Go one value further
    currentIndex = currentIndex + 1;
    if(currentIndex >= data.length) currentIndex = 0;

    let mappedTemperature = map(temperature, -20, 40, 0, 255); // Map the temperature (-20 to 40) to the range of byte (0 to 255) 
    serial.write(Number(mappedTemperature)); // This data will get sent as a "byte", so it can only be from 0 to 255 and we have to convert it to "Number"
    console.log(mappedTemperature);
    millisLastSent = millisNow;
  }
}


// Here are some functions that ther Serial Communication uses
// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

function gotClose(){
    console.log("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  //console.log("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device