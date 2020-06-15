/* erstes BSP
var walkerX;
var walkerY;
var speed = 20;
*/


let temperature = 0;
let weather = "";
let json;

let url;

//Bild
let nebel;

//Arduino

let serial; // variable to hold an instance of the serialport library
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function preload() {

    nebel = loadImage('Nebel.jpg');

  let apiKey = "8b7442a39a8d1591af2eaa935816e9a7";
  
  let cityID = "2954172"; // Augsburg

  url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&units=metric&APPID=" + apiKey;
  loadJSON(url, updateData); // check callback "updateData" at the end of this script
}


function setup() {
    createCanvas(1280,800);
    //vidnebel.play();
   // background(20);
   // walkerX=width/2;
    //walkerY=height/2;

    //Arduino
     // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.list();
    serial.open("/dev/tty.usbmodem142201"); // On Mac it may be something like this

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


  //Arduino
  let receivedValues = split(latestData, " ");

  // change background 
  let backgroundValue = map(receivedValues[0], 0, 1023, 0, 1000);
  image(nebel, 0, 0, 1280, 800, backgroundValue);


  //background(0);

  temperature = json.main.feels_like;
  weather = json.weather[0].description;
 
  //fill(255);
  //text(json.name, 10, 50);
  //text("Current temperature: " + temperature, 10, 70);
  //text("Forecast: " + weather, 10, 90);

  if (frameCount % 61 == 0) {
    loadJSON(url, updateData); 
  }


  
      //if( weather == mist){


     // NO
      //background(20);
      /*fill(255, 255, 255, 20);
      noStroke();
      ellipse(walkerX,walkerY,250,250);
      walkerX = walkerX + random(speed*-1, speed);
      walkerY = walkerY + random(speed*-1, speed);
      */


      //fill(20);
      //rect(0, 0, 1280, 400);
       // image(nebel,0,0, 1280,800);
        
    //  }
  

}


// update date
function updateData(newData) {
  json = newData;
  console.log(json);
}



//Arduino

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  latestData = currentString; // save it for the draw method
}


