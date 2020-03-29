// setup
function setup() {

  // canvas
  createCanvas(1024, 768);
  noLoop(); // draw loop is just executed once


}

// draw
function draw() {

  // clear background
  background(0);

  // draw whatever you like
  for (let i = 0; i < 100; i++) {
    noStroke();
    fill(255);
    rect(random(width), random(height), 10, 10);
  }

  // save screen as PNG
  save('screen.png');

}