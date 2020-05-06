// boxes
let boxes = [];

// smooth
let smoothFactor = 10; // higher value means more smoothing for smoothed properties

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..

}

// setup
function setup() {

  // canvas
  createCanvas(1280, 800);

  // init boxes
  for (let i = 0; i < 20; i++) {

    // properties
    x = 32 + i * 20;
    y = height / 2;
    w = 16;
    h = 16;

    let box = new Box(i, x, y, w, h);

    boxes.push(box);

  }

  // init properties single box
  x = width / 2;
  y = height / 2;
  w = 40;
  h = 40;

}

// draw
function draw() {

  // clear background
  background(0);

  // instruction
  fill(255);
  noStroke();
  textSize(18);
  text("click mouse somewhere in the background to move smoothly", 32, 32);
  text("press SPACE to randomly change size smoothly", 32, 64);

  // loop through boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }


}

// mouse interaction
function mouseReleased() {

  // loop through boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].x = mouseX + random(-200, 200); // just random values for testing
    boxes[i].y = mouseY + random(-200, 200); // just random values for testing
  }

}

// keyboard interaction
function keyReleased() {
  // SPACE
  if (keyCode == 32) {
    // loop through boxes
    for (let i = 0; i < boxes.length; i++) {
      let randomSize = random(5, 50); // just random values for testing
      boxes[i].w = randomSize;
      boxes[i].h = randomSize;
    }
  }
}


// classes
class Box {

  constructor(id, x, y, w, h, d, t) {
    // properties box
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.smooth_x = 0; // or x
    this.smooth_y = 0; // or y
    this.smooth_w = 0; // or w
    this.smooth_h = 0; // or h
  }

  show() {

    // smooth
    this.smooth_x += (this.x - this.smooth_x) / smoothFactor;
    this.smooth_y += (this.y - this.smooth_y) / smoothFactor;
    this.smooth_w += (this.w - this.smooth_w) / smoothFactor;
    this.smooth_h += (this.h - this.smooth_h) / smoothFactor;

    // draw box
    noStroke();
    rectMode(CENTER);
    rect(this.smooth_x, this.smooth_y, this.smooth_w, this.smooth_h);

  }
}