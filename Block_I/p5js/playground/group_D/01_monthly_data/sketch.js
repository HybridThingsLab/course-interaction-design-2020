// data
let file;
let data;

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

  // variable to draw text year just once in for-loop
  let drawOneTime = true;
  // Array for 12 Months, initialised with zeroes so that we can add to it later
  let monthlyData = [0,0,0,0,0,0,0,0,0,0,0,0];

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
      // for example get average precipitation of each day (see JSON file for further data)
      let precipitation = data[i].RSK;

      // Which Month is it? 01 = January,  -1 because we want to use this to access the array which starts at 0
      let currentMonth = data[i].MESS_DATUM.substr(5, 2)-1;
      monthlyData[currentMonth] = monthlyData[currentMonth] + precipitation;
      
      // draw here (WHERE THE MAGIC HAPPENS!)
      stroke(255);
      strokeWeight(width / 365);
      noFill();
      line(counterX, height / 2, counterX, height / 2 - precipitation * zoom);

      // counter x position
      counterX += width / 365;

    }

  }
  counterX = 0;

  // loop through monthly data
  for (let i = 0; i < monthlyData.length; i++) {
    console.log(monthlyData[i]);
  }

}