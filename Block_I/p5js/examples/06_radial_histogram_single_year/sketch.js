// data
let file;
let data;

// visualization
var zoom = 5.0;
var diameterCircle = 80;

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

  // draw text year just once in for-loop
  let drawOneTime = true;

  // loop through weather data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);
    // check if specific year, for example '2018'
    if (currentYear == 2018) {

      // year as text one time
      if (drawOneTime == true) {
        fill(255);
        noStroke();
        text(currentYear, 16, 16);
        drawOneTime = false;
      }

      // GET VALUE(S) OF WEATHER DATA HERE!
      // for example get average temperature of each day (see JSON file for further data)
      let temperature = data[i].TMK;

      // calculate points of line
      let r1 = diameterCircle + temperature * zoom;
      let a1 = TWO_PI * (i / 365) - HALF_PI;
      let x1 = width / 2 + r1 * cos(a1);
      let y1 = height / 2 + r1 * sin(a1);

      let r2 = diameterCircle;
      let a2 = TWO_PI * (i / 365) - HALF_PI;
      let x2 = width / 2 + r2 * cos(a2);
      let y2 = height / 2 + r2 * sin(a2);

      // draw here (WHERE THE MAGIC HAPPENS!)
      // check if temperature above 0 degree Celsius
      stroke(255);
      strokeWeight(1);
      line(x1, y1, x2, y2);

    }

  }

}