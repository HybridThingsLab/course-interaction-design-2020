let file;
let year = 2009; // change here
let data;
let dataYear = [];
let zoom = 15;
let counterFill = 2; // less means slower

var msg = 'Hello World';
console.log(msg);

// boxes
let boxes = [];

// preload
function preload() {

  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");

}

// setup
function setup() {

  // canvas
  createCanvas(1024, 1024);

  // get all weather data
  data = file.data;

  // loop through all data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);

    // check if specific year
    if (currentYear == year || currentYear == "2010" || currentYear == "2011" || currentYear == "2012" || currentYear == "2013" || currentYear == "2014" || currentYear == "2015" || currentYear == "2016" || currentYear == "2017" || currentYear == "2018") {
      //if (currentYear == year || currentYear == "2011") {
      // push data into array
      dataYear.push(data[i]);
    }


  }

  let counterX = 0;

  for (let i = 0; i < dataYear.length; i++) {

    // GET VALUE(S) OF WEATHER DATA HERE!
    let date = dataYear[i].MESS_DATUM;
    // average temperature
    let temperature = dataYear[i].NM;

    let w = width / 365;
    //let h = abs(temperature) * zoom;
    let h = height;
    let x = counterX;
    let y = 0;
    // init box (x, y, widht, height)
    let box = new Box(i, x, y, w, h, date, temperature);
    boxes.push(box);

    // counter x position
    counterX += width / 365;
    if (counterX >= 1024) {
      counterX = 0;
    }
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
    if (id >= 0 && id <= 364) {
      this.y = 0;
    } else if (id >= 365 && id <= 729) {
      this.y = 102;
    } else if (id >= 730 && id <= 1094) {
      this.y = 204;
    } else if (id >= 1095 && id <= 1459) {
      this.y = 306;
    } else if (id >= 1460 && id <= 1824) {
      this.y = 408;
    } else if (id >= 1825 && id <= 2189) {
      this.y = 510;
    } else if (id >= 2190 && id <= 2554) {
      this.y = 612;
    } else if (id >= 2555 && id <= 2919) {
      this.y = 714;
    } else if (id >= 2920 && id <= 3284) {
      this.y = 816;
    } else if (id >= 3285 && id <= 3649) {
      this.y = 918;
    }

    this.w = w;
    this.h = h;
    this.date = d;
    // collision
    this.hitMouse = false;
    // fill
    this.fill = 0;
  }

  show() {

    // collision mouse
    // check if value less than zero
    this.hitMouse = collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h / 10);
    if (this.hitMouse) {

      fill(0);
      noStroke;

      if (mouseIsPressed) {
        this.fill = this.temperature * zoom * 5;
        //text("box with ID " + this.id + " clicked", 8, 32);

      } else {
        this.fill = this.temperature * zoom;
      }

    } else {
      this.fill -= counterFill;
      if (this.fill <= 0) {
        this.fill = 0;
      }
    }

    // draw box
    noStroke();
    fill(this.fill);
    rect(this.x, this.y, this.w, this.h / 10);

  }


}