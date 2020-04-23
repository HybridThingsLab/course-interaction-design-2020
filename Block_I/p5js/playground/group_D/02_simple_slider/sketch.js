let slider;
let bubble;

// preload
function preload() {
}

// setup
function setup() {
  // canvas
  createCanvas(1024, 768);

  // A slider to select the year
  slider = createSlider(1, 100, 1);
  slider.position(width/2-100, 30);
  slider.style('width', '200px');

  bubble = new Bubble(width/2, height/2, 1);
}

function mousePressed() {
  let distance = dist(mouseX, mouseY, bubble.x, bubble.y);
  if (distance < (bubble.d / 2)) {
    bubble.pressed(); // Tell the bubble it was clicked
  }
}

function mouseReleased() {
  bubble.released(); // "Unclick" all circles, just in case any was stuck...
}

// draw
function draw() {
  let sliderValue = slider.value();
  background(map(sliderValue, 1, 100, 0, 255));
  bubble.d = map(sliderValue, 1, 100, 1, 1000);
  bubble.show();
}

// A class can be declared here in this sketch.js patch or in its own .js file
class Bubble {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }

  // If clicked closer that the radius we say the circle was clicked
  // If you would create a HTML DOM emlement instead (img/text), you could do much more magic like easy hovering, style etc...
  pressed() {
    this.d = 1;
    slider.value(1);
  }

  released() {
  }

  show() {
    stroke(255);
    strokeWeight(3);
    noFill();
    circle(this.x, this.y, this.d);
  }
}