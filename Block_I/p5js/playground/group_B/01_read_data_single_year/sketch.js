// data
let file;
let year = 2018; // change here
let data;
let dataYear = [];

// visualization
let counterX = 0;
let zoom = 5.0;

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

  // get all weather data
  data = file.data;

  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);

    // check if specific year
    if (currentYear == year) {
      // push data into array
      dataYear.push(data[i]);
    }

  }

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

  // draw year
  fill(255);
  noStroke();
  text(year, 16, 16);


  // loop through weather data of specific year
  for (let i = 0; i < dataYear.length; i++) {

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = dataYear[i].TMK;

    // draw here (WHERE THE MAGIC HAPPENS!)
    stroke(255);
    strokeWeight(width / dataYear.length);
    noFill();
    line(counterX, height / 2, counterX, height / 2 - temperature * zoom);

    // counter x position
    counterX += width / dataYear.length;

  }


}