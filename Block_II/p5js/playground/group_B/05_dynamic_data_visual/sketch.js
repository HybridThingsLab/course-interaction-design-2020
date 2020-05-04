// data
let file;
let data;

// visualization
let counterData = 0;
let zoom = 10.0;

// preload
function preload() {

  // load json file with weather data

  //file = loadJSON("data/DWD-Augsburg-2009-2019.json"); // >> run on (local) webserver
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");

}

// setup
function setup() {

  // canvas
  createCanvas(600, 600);

  // get all weather data
  data = file.data;

}

// draw
function draw() {

  // clear background
  background(0);

  // show current date
  fill(255);
  noStroke();
  textAlign(LEFT);
  text(data[counterData].MESS_DATUM, 8, 16);

  // show wind speed
  let wind = data[counterData].FM;
  fill(255);
  noStroke();
  rect(width / 2 - 10, height / 2, 20, -wind * zoom);
  textAlign(RIGHT);
  text(wind + " m/s", width / 2 + 28, height / 2 + 24);


  // counter data
  // just every x frames
  if ((frameCount % 4) == 0) {
    counterData++;
  }
  if (counterData >= data.length) {
    counterData = 0;
  }

}