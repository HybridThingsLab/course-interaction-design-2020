// p5.sound library used > included in index.html
// see also https://p5js.org/reference/#/libraries/p5.sound

// data
let file;
let data;

// visualization
let counterData = 0;
let zoom = 10.0;
let hintAudio = true;

// audio
let osc;

// preload
function preload() {

  // load json file with weather data

  //file = loadJSON("data/DWD-Augsburg-2009-2019.json"); // >> run on (local) webserver
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");

}

// setup
function setup() {

  // canvas
  createCanvas(600, 600);

  // oscillator
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);

  // get all weather data
  data = file.data;

}

// draw
function draw() {

  // clear background
  background(0);

  // show hint audio
  if (hintAudio) {
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text("PRESS MOUSE TO HEAR SOUND", width / 2, 100);
  }

  // show current date
  fill(255);
  noStroke();
  textSize(12);
  textAlign(LEFT);
  text(data[counterData].MESS_DATUM, 8, 16);

  // show wind speed
  let wind = data[counterData].FM;
  fill(255);
  noStroke();
  rect(width / 2 - 10, height / 2, 20, -wind * zoom);
  textAlign(RIGHT);
  text(wind + " m/s", width / 2 + 28, height / 2 + 24);

  // sonify wind speed 
  let freq = map(wind, 0, 20, 80, 1000);
  osc.freq(freq);


  // counter data
  // just every x frames
  if ((frameCount % 4) == 0) {
    counterData++;
  }
  if (counterData >= data.length) {
    counterData = 0;
  }

}

// mouse interaction
function mouseReleased() {
  // mouse interaction needed to use sound
  // see also https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
  osc.start();
  hintAudio = false;
}