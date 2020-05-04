// library p5.collide2d used > included in index.html
// see also https://github.com/bmoren/p5.collide2D

// interaction
let hitMouse = false;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
}

// setup
function setup() {

  // canvas
  createCanvas(600, 600);

}

// draw
function draw() {

  // clear background
  background(0);

  // properties box
  let w = 40;
  let h = 40;
  let x = width / 2 - w / 2;
  let y = height / 2 - h / 2;

  // collision mouse
  hitMouse = collidePointRect(mouseX, mouseY, x, y, w, h);
  if (hitMouse) {
    // mouse pressed
    if (mouseIsPressed) {
      fill(0, 255, 0);
    } else {
      fill(255);
    }
  } else {
    fill(0);
  }

  // draw box
  stroke(255);
  rect(x, y, w, h);

}