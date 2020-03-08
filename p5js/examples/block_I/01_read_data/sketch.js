// data
let weatherData;
let file;

// visualization
var counterX = 0;
var zoom = 10.0;

// preload
function preload() {

  // load json file with weather data
  file = loadJSON("data/Augsburg.json");
  // New File available: DWD-Augsburg-2009-2019.json

}

// setup
function setup() {

  // canvas
  createCanvas(1024, 768);
  noLoop();

  // get weather data
  weatherData = file.data;

}

// draw
function draw() {

  // clear background
  background(0);

  // draw line
  stroke(255);
  noFill();
  line(0, height / 2, width, height / 2);

  // loop through weather data
  for (let i = 0; i < weatherData.length; i++) {

    // for example get temperature from each entry (see JSON file for further data)
    let temperature = weatherData[i].T;

    // draw here
    counterX += width / weatherData.length;
    stroke(255);
    strokeWeight(width / weatherData.length);
    noFill();
    line(counterX, height / 2, counterX, height / 2 - temperature * zoom);

  }
  counterX = 0;


}