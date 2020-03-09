// data
let file;
let data;

// visualization
var counterX = 0;
var zoom = 5.0;

// preload
function preload() {

  // load json file with weather data
  file = loadJSON("data/DWD-Augsburg-2009-2019.json");

}

// setup
function setup() {

  // canvas
  createCanvas(1024, 768);
  noLoop();

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

  // needed for check if year changed in data
  let lastYear = "";

  // loop through weather data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);
    // check if new
    if (currentYear != lastYear) {
      // year as text
      fill(0, 255, 0);
      noStroke();
      text(currentYear, counterX + 8, 16);
      // draw vertical line
      stroke(0, 255, 0);
      strokeWeight(1);
      noFill();
      line(counterX, 0, counterX, height);
    }
    lastYear = currentYear;

    // get value of weater data here!!!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = data[i].TMK;

    // draw here
    stroke(255);
    strokeWeight(width / data.length);
    noFill();
    line(counterX, height / 2, counterX, height / 2 - temperature * zoom);

    // counter x position
    counterX += width / data.length;

  }
  counterX = 0;


}