// data
let file;
let data;

// visualization
let zoom = 5.0;
let radiusCircle = 150; // This value was too small to allow very low temperatures like -20°

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
      let r1 = radiusCircle + temperature * zoom;
      let a1 = TWO_PI * (i / 365) - HALF_PI;
      let x1 = width / 2 + r1 * cos(a1);
      let y1 = height / 2 + r1 * sin(a1);

      let r2 = radiusCircle;
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
  
  
  // Reference Circles
  // Array for 12 Months, initialised with zeroes so that we can add to it later
  let temperatureCircles = [-20,-10,0,10,20,30];

  for (let i = 0; i < temperatureCircles.length; i++) {
    // Draw the reference size
    noFill();
    stroke(255,0,0);
    strokeWeight(3);
    circle(width / 2, height / 2, (radiusCircle + (temperatureCircles[i] * zoom))*2); // 0° Circle, radius*2 because diameter

    // Write the value of the circle
    noStroke();
    fill(255, 0, 0);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(temperatureCircles[i] + "°", width / 2 + (radiusCircle + (temperatureCircles[i] * zoom)) + 5, height / 2); // With zeroes at the beginning as months are used to be printed
  }

}