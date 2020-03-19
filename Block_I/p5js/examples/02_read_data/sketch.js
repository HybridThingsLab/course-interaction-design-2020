// data
let file;
let data;

// visualization
var counterX = 0;
var zoom = 5.0;

// preload
function preload() {

  // load json file with weather data

  //file = loadJSON("data/DWD-Augsburg-2009-2019.json"); // >> run on (local) webserver
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");

}

// setup
function setup() {

  // canvas
  createCanvas(1024, 768);
  noLoop(); // draw loop is just executed once

  // get weather data
  data = file.data;

}

// draw
function draw() {

  // clear background
  background(0);

  // draw line
  stroke(255);
  strokeWeight(1);
  noFill();
  line(0, height / 2, width, height / 2);


  // loop through weather data
  for (let i = 0; i < data.length; i++) {

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = data[i].TMK;

    // draw here (WHERE THE MAGIC HAPPENS!)
    stroke(255);
    strokeWeight(width / data.length);
    noFill();
    line(counterX, height / 2, counterX, height / 2 - temperature * zoom);

    // counter x position
    counterX += width / data.length;

  }
  counterX = 0;


}