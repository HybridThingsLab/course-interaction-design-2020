let file, data;
let counterX = 0;
let zoom = 10;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
  file = loadJSON("data/Augsburg.json");
}

// setup
function setup() {
  data = file.data
  // canvas
  createCanvas(1280, 800);
}

// draw
function draw() {

  background(0)

  // loop through weather data
  for (let i = 0; i < data.length; i++) {

    // Load one measurement from the json
    let temperature = data[i].T;

    // draw here
    counterX += width / data.length;
    fill(255);
    noStroke();
    rect(counterX, height / 2 - temperature * zoom, 2, 2);

    // local time (might be useful later)
    let local_time = data[i].local_time;

  }
  counterX = 0;

  strokeWeight(1)
  stroke(255)
  line(0, height / 2, width, height / 2)
}