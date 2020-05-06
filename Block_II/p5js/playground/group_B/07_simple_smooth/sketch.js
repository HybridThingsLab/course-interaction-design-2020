// properties simple box
let x, y, w, h;
let smooth_x = 0;
let smooth_y = 0;
let smooth_w = 0;
let smooth_h = 0;
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

  // smooth (this algorithm can be used for any value)
  smooth_x += (x - smooth_x) / smoothFactor;
  smooth_y += (y - smooth_y) / smoothFactor;
  smooth_w += (w - smooth_w) / smoothFactor;
  smooth_h += (h - smooth_h) / smoothFactor;

  // instruction
  fill(255);
  noStroke();
  textSize(18);
  text("click mouse somewhere in the background to move smoothly", 32, 32);
  text("press SPACE to randomly change size smoothly", 32, 64);

  // draw box
  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(smooth_x, smooth_y, smooth_w, smooth_h);



}

// mouse interaction
function mouseReleased() {
  x = mouseX;
  y = mouseY;
}

// keyboard interaction
function keyReleased() {
  // SPACE
  if (keyCode == 32) {
    // loop through boxes
    let randomSize = random(20, 200); // just random values for testing
    w = randomSize; // just random values for testing
    h = randomSize; // just random values for testing
  }
}