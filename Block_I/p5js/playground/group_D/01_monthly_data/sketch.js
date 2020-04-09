// data
let file;
let data;

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
      // We do not want to draw the daily stuff, thus we do nothing here
    }
  }
  // loop through monthly data
  
  // This is how you find and log the biggest value of a array
  console.log("Max: " + max(monthlyData));

  for (let i = 0; i < monthlyData.length; i++) {
    console.log(monthlyData[i]);
    stroke(255);
    strokeWeight(3);
    noFill();
    let xPos = map(i, 0, 11, 100, width-100); // Let the circles spread from left (100) to right (width-100)
    let yPos = height / 2; // Let the be in the middle (y-axis)
    let circleSize = map(monthlyData[i], 0, max(monthlyData), 0, 200); // Smallest circle (zero rain) should have 0 diameter, biggest circlle (max amount of rain of all months) should be 200
    
    // Draw the circle
    circle(xPos, yPos, circleSize);

    // Write the month and the cummulated ammount of percipitation
    noStroke();
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(nf(i,2), xPos, yPos + 150); // With zeroes at the beginning as months are used to be printed
    
    textSize(10);
    text(round(monthlyData[i]) + " mm", xPos, yPos + 170); // Rounded because whats the point of half a mm?
  }

}