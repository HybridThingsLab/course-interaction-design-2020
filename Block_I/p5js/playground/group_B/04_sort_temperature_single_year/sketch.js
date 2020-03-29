// data
let file;
let year = 2018; // change here
let data;
let dataYear = [];
let temperatures = [];

// visualization
let counterX = 0;
let c1, c2, c3, c4, c5;

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

  // define colors
  c1 = color(0, 0, 255);
  c2 = color(0, 125, 255);
  c3 = color(0, 255, 255);
  c4 = color(255, 255, 0);
  c5 = color(255, 0, 0);

  // get all weather data
  data = file.data;

  // loop through all data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);

    // check if specific year
    if (currentYear == year) {
      // push data into array
      dataYear.push(data[i]);
    }

  }

  // fill new array with values temperature

  // loop through weather data of year
  for (let i = 0; i < dataYear.length; i++) {

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = dataYear[i].TMK;

    // push data into array
    temperatures.push(temperature);

  }

  // sort values here !!!
  // ascending
  temperatures.sort(function (a, b) {
    return a - b;
  });
  // descending
  /*temperatures.sort(function (a, b) {
    return b - a;
  });*/

}

// draw
function draw() {

  // clear background
  background(0);


  // draw year
  fill(255);
  noStroke();
  text(year + ": temperature", 8, 32);


  // loop through temperatures
  for (let i = 0; i < temperatures.length; i++) {

    // draw here (WHERE THE MAGIC HAPPENS!)

    noStroke();
    if (temperatures[i] <= -15.0) {
      let inter = map(temperatures[i], -30.0, -15.0, 0, 1);
      fill(lerpColor(c1, c2, inter));
    }
    if ((temperatures[i] > -15.0) && (temperatures[i] <= 0.0)) {
      let inter = map(temperatures[i], -15.0, 0.0, 0, 1);
      fill(lerpColor(c2, c3, inter));
    }
    if ((temperatures[i] > 0.0) && (temperatures[i] <= 15.0)) {
      let inter = map(temperatures[i], 0.0, 15.0, 0, 1);
      fill(lerpColor(c3, c4, inter));
    }
    if (temperatures[i] > 15.0) {
      let inter = map(temperatures[i], 15.0, 30, 0, 1);
      fill(lerpColor(c4, c5, inter));
    }
    // draw rect
    rectMode(CENTER);
    rect(counterX, height / 2, width / temperatures.length - 1, height / 2);

    // counter x position
    counterX += width / dataYear.length;

  }


}