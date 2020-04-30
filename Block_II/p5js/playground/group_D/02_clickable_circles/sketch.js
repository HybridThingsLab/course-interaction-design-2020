// data
let file;
let data;
let yearToDraw = 2018;

let bubbles = []; // This array will hold our bubblef from the class "Bubble"

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

  // get weather data
  data = file.data;

  // Array for 12 Months, initialised with zeroes so that we can add to it later
  let monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // loop through weather data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);

    // check if specific year, for example '2018'
    if (currentYear == yearToDraw) {

      // GET VALUE(S) OF WEATHER DATA HERE!
      // for example get average precipitation of each day (see JSON file for further data)
      let precipitation = data[i].RSK;

      // Which Month is it? 01 = January,  -1 because we want to use this to access the array which starts at 0
      let currentMonth = data[i].MESS_DATUM.substr(5, 2) - 1;
      monthlyData[currentMonth] = monthlyData[currentMonth] + precipitation;
    }
  }
  // loop through monthly data
  
  // This is how you find and log the biggest value of a array
  console.log("Max: " + max(monthlyData));

  for (let i = 0; i < monthlyData.length; i++) {
    console.log(monthlyData[i]);
    
    let xPos = map(i, 0, 11, 100, width-100); // Let the circles spread from left (100) to right (width-100)
    let yPos = height / 2; // Let the be in the middle (y-axis)
    let circleDiameter = map(monthlyData[i], 0, max(monthlyData), 0, 200); // Smallest circle (zero rain) should have 0 diameter, biggest circlle (max amount of rain of all months) should be 200
    
    // Draw the circle
    circle(xPos, yPos, circleDiameter);

    let b = new Bubble(xPos, yPos, circleDiameter, i, monthlyData[i]);
    bubbles.push(b);
  }
}

function mousePressed() {
  let shortestDistanceBubble; // The Bubble that was the closest to the mouse
  let shortestDistance; // How far was it away

  // Check which bubble is closest to the click, otherwise if they overlap all bubbles the mouse was over would react
  for (let i = 0; i < bubbles.length; i++) {
    let distance = dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y);
    if (distance < (bubbles[i].d / 2)) { // Was the click inside the bubble?
      if (distance < shortestDistance || shortestDistance == null){ // Was the click closer than all previous bubbles or is this the first finding?
        shortestDistanceBubble = bubbles[i];
        shortestDistance = distance;
      }
    }
  }
  // If we have found any bubble...
  if(shortestDistanceBubble != undefined){
    shortestDistanceBubble.pressed(); // Tell the bubble it was clicked
  }
}

function mouseReleased() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].released(); // "Unclick" all circles, just in case any was stuck...
  }
}

// draw
function draw() {

  // clear background
  background(0);

  // Year
  fill(255);
  noStroke();
  text(yearToDraw, 16, 16);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
  }
}

// A class can be declared here in this sketch.js patch or in its own .js file
class Bubble {
  constructor(x, y, d, monthNumber, weatherData) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.monthNumber = monthNumber;
    this.weatherData = weatherData;
    this.isActive = false;
  }

  // If clicked closer that the radius we say the circle was clicked
  // If you would create a HTML DOM emlement instead (img/text), you could do much more magic like easy hovering, style etc...
  pressed() {
    this.isActive = true;
  }

  released() {
    this.isActive = false;
  }

  show() {
    stroke(255, 200);
    strokeWeight(3);
    if(this.isActive) fill(255, 200);
    else noFill();
    circle(this.x, this.y, this.d);

    
    // Write the month and the cummulated ammount of percipitation
    noStroke();
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(nf(this.monthNumber,2), this.x, this.y + 150); // With zeroes at the beginning as months are used to be printed
    
    // If the circle was clicked, draw some other stuff
    if(this.isActive){    
      fill(255);
      textSize(12);
      text(round(this.weatherData) + " mm", this.x, this.y - this.d/2 - 10); // Rounded because whats the point of half a mm?
    }
  }
}