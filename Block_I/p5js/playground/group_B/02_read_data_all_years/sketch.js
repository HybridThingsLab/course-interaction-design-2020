// data
let file;
let year = 2018; // change here
let data;
let dataYears = [];

// visualization
let counterX = 0;
let counterY = 0;
let zoom = 1.5;

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
  let counterYear = 0;

  // loop through all data
  for (let i = 0; i < data.length; i++) {

    // check if new year (= first day of year)
    if (data[i].MESS_DATUM.match("01-01")) {
      // counter year and counter y (not at first iteration)
      if (i != 0) {
        // counter year
        counterYear++;
      }
      // create 2-dimensional array
      dataYears[counterYear] = [];
    }
    // push data into 2-dimensional array
    dataYears[counterYear].push(data[i]);

  }

  // counter y
  counterY = height / dataYears.length - 32;

}

// draw
function draw() {

  // clear background
  background(0);

  // loop through years
  for (let i = 0; i < dataYears.length; i++) {

    // loop through weather data of one year
    for (let j = 0; j < dataYears[i].length; j++) {

      // just one time
      if (j == 0) {
        // draw current year
        let currentYear = dataYears[i][j].MESS_DATUM.substr(0, 4);
        fill(0, 255, 0);
        noStroke();
        text(currentYear, 16, counterY - 32);
      }

      // GET VALUE(S) OF WEATHER DATA HERE!
      // for example get average temperature of each day (see JSON file for further data)
      let temperature = dataYears[i][j].TMK;

      // draw here (WHERE THE MAGIC HAPPENS!)
      stroke(255);
      strokeWeight(width / dataYears[i].length);
      noFill();
      line(counterX, counterY, counterX, counterY - temperature * zoom);

      // counter x position
      counterX += width / dataYears[i].length;

    }

    // reset counter x
    counterX = 0;

    // counter y
    counterY += height / dataYears.length;

  }


}