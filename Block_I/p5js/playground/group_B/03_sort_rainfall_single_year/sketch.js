// data
let file;
let year = 2018; // change here
let data;
let dataYear = [];
let rainFalls = [];

// visualization
let counterX = 0;
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
  createCanvas(1024, 768);
  noLoop(); // draw loop is just executed once

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

  // fill new array with values wind speed

  // loop through weather data of year
  for (let i = 0; i < dataYear.length; i++) {

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get amount of rainfall (mm) (see JSON file for further data)
    let rainFall = dataYear[i].RSK;

    // push data into array
    rainFalls.push(rainFall);

  }

  // sort values here !!!
  // ascending
  /*rainFalls.sort(function (a, b) {
    return a - b;
  });*/
  // descending
  rainFalls.sort(function (a, b) {
    return b - a;
  });

}

// draw
function draw() {

  // clear background
  background(0);


  // draw year
  fill(255);
  noStroke();
  text(year + ": rain falls (mm)", 8, 32);


  // loop through rain falls
  for (let i = 0; i < rainFalls.length; i++) {

    // draw here (WHERE THE MAGIC HAPPENS!)

    stroke(255);
    strokeWeight(1);
    noFill();
    line(counterX, height / 2, counterX, height / 2 - rainFalls[i] * zoom);

    // counter x position
    counterX += width / rainFalls.length;

  }


}