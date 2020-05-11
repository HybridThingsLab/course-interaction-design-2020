// library Tone.js used > also included in index.html
// see also https://github.com/Tonejs/Tone.js
// and reference for FM Oscillator https://tonejs.github.io/docs/13.8.25/FMOscillator
// good examples see also https://tone-demos.glitch.me/


// sound
let fmOsc;
let volume = 0.9;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
}

// setup
function setup() {

  // canvas
  createCanvas(600, 600);

  // sound

  // set volume
  Tone.Master.volume.value = volume;

  // add a sine oscillator frequency-modulated by a square wave
  fmOsc = new Tone.FMOscillator("C2", "sine", "sine").toMaster().start();

}

// draw
function draw() {

  // clear background
  background(0);

  // modulate synthy
  let harmonicity = map(mouseX, 0, width, 0, 4);
  fmOsc.harmonicity.value = harmonicity;
  let frequency = map(mouseY, 0, width, 40, 200);
  fmOsc.frequency.value = frequency;

}