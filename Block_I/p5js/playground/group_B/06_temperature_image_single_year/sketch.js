// image
let img;

// data
let file;
let year = 2016; // change here
let data;
let dataYear = [];

// visualization
let counterX = 0;
let counterY = 0;
let offsetX = 0;
let offsetY = 24;
let c1, c2, c3, c4, c5;

// preload
function preload() {

  // load json file with weather data

  //file = loadJSON("data/DWD-Augsburg-2009-2019.json"); // >> run on (local) webserver
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");

  // load image augsburg
  img = loadImage('data/augsburg_turm.jpg');

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

}

// draw
function draw() {

  // clear background
  background(0);

  // current month
  let lastMonth = "";

  // loop through weather data of year defined
  for (let i = 0; i < dataYear.length; i++) {

    // get current month
    let currentMonth = dataYear[i].MESS_DATUM.substr(5, 2);

    // check if new month
    if (currentMonth != lastMonth) {

      // counters position
      counterY += height / 12 / 1.3;
      counterX = 0;

      // set last month to current month
      lastMonth = currentMonth;
    }

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = dataYear[i].TMK;

    // draw here (WHERE THE MAGIC HAPPENS!)
    if (temperature <= -15.0) {
      let inter = map(temperature, -30.0, -15.0, 0, 1);
      tint(lerpColor(c1, c2, inter));
    }
    if ((temperature > -15.0) && (temperature <= 0.0)) {
      let inter = map(temperature, -15.0, 0.0, 0, 1);
      tint(lerpColor(c2, c3, inter));
    }
    if ((temperature > 0.0) && (temperature <= 15.0)) {
      let inter = map(temperature, 0.0, 15.0, 0, 1);
      tint(lerpColor(c3, c4, inter));
    }
    if (temperature > 15.0) {
      let inter = map(temperature, 15.0, 30, 0, 1);
      tint(lerpColor(c4, c5, inter));
    }
    image(img, offsetX + counterX, offsetY + counterY, width / 32, width / 32 * 1.5);

    // counter x position
    counterX += width / 31;

  }

  save("screen.png");


}