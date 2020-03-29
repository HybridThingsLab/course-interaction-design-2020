// font
let font;

// preload
function preload() {

  // load data here
  // for example images, sounds, JSON files...
  font = loadFont('data/SourceSansPro-Bold.ttf');

}

// setup
function setup() {

  // canvas
  createCanvas(1024, 768);

}

// draw
function draw() {

  // clear background
  background(0);

  // draw HERE
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(32);
  text("The quick brown fox jumps over the lazy dog", width / 2, height / 2);


}