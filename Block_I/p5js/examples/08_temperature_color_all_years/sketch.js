// data
let file;
let data;

// visualization
let counterX = 0;
let zoom = 1.0;
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

  // get weather data
  data = file.data;

  // define colors
  c1 = color(0, 0, 255);
  c2 = color(0, 125, 255);
  c3 = color(0, 255, 255);
  c4 = color(255, 255, 0);
  c5 = color(255, 0, 0);

}

// draw
function draw() {

  // clear background
  background(0);

  // counter positions + rotation
  let counterY = 1;
  let posY = 0;

  // needed to check if year changed in next for-loop
  let lastYear = "";

  // loop through weather data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);
    // check if new
    if (currentYear != lastYear) {

      // counter position
      posY = counterY * height / 11 - height / 11 / 2;
      counterY++;
      counterX = 0;

      // year as text
      fill(255);
      noStroke();
      text(currentYear, 16, posY);
    }
    lastYear = currentYear;

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = data[i].TMK;

    // draw here (WHERE THE MAGIC HAPPENS!)

    // for different temperatures different colors
    // use of lerp to interpolate between values
    noStroke();
    if (temperature <= -15.0) {
      let inter = map(temperature, -30.0, -15.0, 0, 1);
      fill(lerpColor(c1, c2, inter));
    }
    if ((temperature > -15.0) && (temperature <= 0.0)) {
      let inter = map(temperature, -15.0, 0.0, 0, 1);
      fill(lerpColor(c2, c3, inter));
    }
    if ((temperature > 0.0) && (temperature <= 15.0)) {
      let inter = map(temperature, 0.0, 15.0, 0, 1);
      fill(lerpColor(c3, c4, inter));
    }
    if (temperature > 15.0) {
      let inter = map(temperature, 15.0, 30, 0, 1);
      fill(lerpColor(c4, c5, inter));
    }
    rect(counterX, posY + 8, width / 365, 40);

    // counter x position
    counterX += width / 365;

  }


}