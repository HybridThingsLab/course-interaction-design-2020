// library p5.collide2d used > included in index.html
// see also https://github.com/bmoren/p5.collide2D

// boxes
let boxes = [];

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
}

// setup
function setup() {

  // canvas
  createCanvas(600, 600);

  // init boxes
  for (let i = 0; i < 15; i++) {
    let w = 20;
    let h = 20;
    let x = i * 40 + 16 - w / 2;
    let y = height / 2 - h / 2;
    let c = color(random(255), random(255), random(255));
    // init box (x, y, widht, height)
    let box = new Box(i, x, y, w, h, c);
    boxes.push(box);
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

  constructor(id, x, y, w, h, c) {
    // properties box
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
    // collision
    this.hitMouse = false;
  }

  show() {

    // collision mouse
    this.hitMouse = collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h);
    if (this.hitMouse) {
      // mouse pressed
      if (mouseIsPressed) {
        fill(0, 255, 9);
      } else {
        fill(255);
      }
    } else {
      fill(this.color);
    }

    // draw box
    stroke(255);
    rect(this.x, this.y, this.w, this.h);

  }


}