// library Tone.js used > also included in index.html
// see also https://github.com/Tonejs/Tone.js
// and reference for synth https://tonejs.github.io/docs/13.8.25/Synth.html
// good examples see also https://tone-demos.glitch.me/


// sound
let synth;
let volume = 1.0;

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

  // Setup a synth with ToneJS
  synth = new Tone.Synth({
    oscillator: {
      type: "sine",
      modulationFrequency: 0.2
    },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.9,
      release: 0.9,
    }
  });
  // connect synth to Tone Master
  synth.connect(Tone.Master);

}

// draw
function draw() {

  // clear background
  background(0);

}

// mouse pressed
function mousePressed() {
  // play note
  // choose a note
  let note = random(["A2", "C3", "D2", "E2", "G3"]);
  // use note
  synth.triggerAttackRelease(note, '8n'); // try also 8n, 4n, 2n...
  // or number
  // synth.triggerAttackRelease(random(80, 200), 0.10);
}