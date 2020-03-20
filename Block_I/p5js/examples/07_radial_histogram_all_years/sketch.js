// data
let file;
let data;

// visualization
let zoom = 2.9;
let diameterCircle = 50;

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

  // counter positions + rotation
  let counterX = 1;
  let counterY = 1;
  let counterRotation = 0;

  // needed to check if year changed in next for-loop
  let lastYear = "";

  // center position
  let centerX = 0;
  let centerY = 0;

  // loop through weather data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);

    // check if new
    if (currentYear != lastYear) {

      // counter x + y
      centerX = counterX * width / 4 - width / 4 / 2
      centerY = counterY * height / 3 - height / 3 / 2;
      counterX++;
      if (counterX >= 5) {
        counterX = 1;
        counterY++;
      }

      // year as text
      fill(255);
      noStroke();
      textAlign(CENTER);
      text(currentYear, centerX, centerY + 8);

      // reset counter rotation
      counterRotation = 0;

    }
    lastYear = currentYear;

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = data[i].TMK;

    // calculate points of line

    let r1 = diameterCircle + temperature * zoom;
    let a1 = TWO_PI * counterRotation / 365 - HALF_PI;
    let x1 = centerX + r1 * cos(a1);
    let y1 = centerY + r1 * sin(a1);

    let r2 = diameterCircle;
    let a2 = TWO_PI * counterRotation / 365 - HALF_PI;
    let x2 = centerX + r2 * cos(a2);
    let y2 = centerY + r2 * sin(a2);

    // counter rotation
    counterRotation++;

    // draw here (WHERE THE MAGIC HAPPENS!)
    // check if temperature above 0 degree Celsius
    stroke(255);
    strokeWeight(1);
    line(x1, y1, x2, y2);

  }

}