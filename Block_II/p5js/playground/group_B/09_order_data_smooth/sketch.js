// library p5.collide2d used > included in index.html
// see also https://github.com/bmoren/p5.collide2D

// data
let file;
let year = 2018; // change here
let data;
let dataYear = [];
let zoom = 5.0;

// smooth
let smoothFactor = 20; // higher value means more smoothing for smoothed properties

// boxes
let boxes = [];

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..

  //file = loadJSON("data/DWD-Augsburg-2009-2019.json"); // >> run on (local) webserver
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");


}

// setup
function setup() {

  // canvas
  createCanvas(1280, 800);

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

  // init boxes

  // counter position x
  let counterX = 0;
  let counterY = height / 3;

  // current month
  let lastMonth = dataYear[0].MESS_DATUM.substr(5, 2);

  for (let i = 0; i < dataYear.length; i++) {

    // size
    let w = 12;
    let h = 12;

    // counter x position
    counterX += w * 2;

    // get current month
    let currentMonth = dataYear[i].MESS_DATUM.substr(5, 2);

    // check if new month
    if (currentMonth != lastMonth) {
      counterY += h * 2;
      counterX = w * 2;
      // set last month to current month
      lastMonth = currentMonth;
    }

    // GET VALUE(S) OF WEATHER DATA HERE!
    // date
    let date = dataYear[i].MESS_DATUM;
    // average temperature
    let temperature = dataYear[i].TMK;

    let x = counterX;
    let y = counterY;
    // init box (x, y, widht, height)
    let box = new Box(i, x, y, w, h, date, temperature);
    boxes.push(box);

  }

}

// draw
function draw() {

  // clear background
  background(0);
  /*noStroke();
  fill(0, 100);
  rect(0, 0, width, height);*/

  // loop through boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }


}

// classes
class Box {

  constructor(id, x, y, w, h, d, t) {
    // properties box
    this.id = id;
    this.x = x;
    // check if temperature bigger than zero (bugfix collision detection p5.collide2d )
    this.y = y;
    this.smooth_x = 0;
    this.smooth_y = 0;
    this.w = w;
    this.h = h;
    this.date = d;
    this.temperature = t;
    // collision
    this.hitMouse = false;
  }

  show() {

    // smooth position
    this.smooth_x += (this.x - this.smooth_x) / smoothFactor;
    this.smooth_y += (this.y - this.smooth_y) / smoothFactor;

    // collision mouse
    // check if value less than zero
    this.hitMouse = collidePointRect(mouseX, mouseY, this.smooth_x, this.smooth_y, this.w, this.h);
    if (this.hitMouse) {
      // show data as text
      textSize(12);
      fill(255);
      text(this.date + ": " + this.temperature + "°", 8, 16);
      // mouse pressed
      if (mouseIsPressed) {
        fill(0, 255, 9);
        text("box with ID " + this.id + " clicked", 8, 32);
      } else {
        fill(255, 0, 0);
      }
    } else {
      fill(255);
    }

    // draw box
    noStroke();
    rectMode(LEFT);
    rect(this.smooth_x, this.smooth_y, this.w, this.h);

    // draw lines next day
    // loop through other boxes
    /*stroke(255);
    strokeWeight(0.5);
    noFill();
    let myMonth = this.date.substr(5, 2);
    if (this.id != boxes.length - 1) {
      let nextMonth = boxes[this.id + 1].date.substr(5, 2);
      if (myMonth == nextMonth) {
        line(this.smooth_x, this.smooth_y, boxes[this.id + 1].smooth_x, boxes[this.id + 1].smooth_y);
      }
    }*/

  }

  randomPosition() {
    this.x = random(width);
    this.y = random(height);
  }


}

// keyboard interaction
function keyReleased() {
  // SPACE
  if (keyCode == 32) {
    // loop through boxes
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].randomPosition();
    }
  }
}