// library p5.collide2d used > included in index.html
// see also https://github.com/bmoren/p5.collide2D

// data
let file;
let year = 2018; // change here
let data;
let dataYear = [];
let zoom = 5.0;

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
  createCanvas(600, 600);

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

  for (let i = 0; i < dataYear.length; i++) {

    // GET VALUE(S) OF WEATHER DATA HERE!
    // date
    let date = dataYear[i].MESS_DATUM;
    // average temperature
    let temperature = dataYear[i].TMK;

    let w = width / dataYear.length;
    let h = abs(temperature) * zoom;
    let x = counterX;
    let y = height / 2;
    // init box (x, y, widht, height)
    let box = new Box(i, x, y, w, h, date, temperature);
    boxes.push(box);

    // counter x position
    counterX += width / dataYear.length;

  }

}

// draw
function draw() {

  // clear background
  background(0);

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
    this.temperature = t;
    if (this.temperature > 0) {
      this.y = y - this.temperature * zoom;
    } else {
      this.y = y;
    }
    this.w = w;
    this.h = h;
    this.date = d;
    // collision
    this.hitMouse = false;
  }

  show() {

    // collision mouse
    // check if value less than zero
    this.hitMouse = collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h);
    if (this.hitMouse) {
      // show data as text
      fill(255);
      text(this.date + ": " + this.temperature + "°", 8, 16);
      // mouse pressed
      if (mouseIsPressed) {
        fill(0, 255, 9);
        text("box width ID " + this.id + " clicked", 8, 32);
      } else {
        fill(255);
      }
    } else {
      fill(125);
    }

    // draw box
    noStroke();
    rect(this.x, this.y, this.w, this.h);

  }


}