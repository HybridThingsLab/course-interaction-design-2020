// library Tone.js used > also included in index.html
// see also https://github.com/Tonejs/Tone.js
// and reference for synth https://tonejs.github.io/docs/13.8.25/Synth.html
// good examples see also https://tone-demos.glitch.me/


// sound
let synths = [];
let volume = 0.1;
let counterSynths = 0;

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

  // Setup many synths with ToneJS
  for (let i = 0; i < 10; i++) {
    let synth = new Tone.Synth({
      oscillator: {
        type: "sine",
        modulationFrequency: 0.2
      },
      envelope: {
        attack: 0.002,
        decay: 0.8,
        sustain: 0.05, // change here!!!
        release: 0.9,
      }
    });
    // add to array
    synths.push(synth);
    // connect synth to Tone Master
    synths[i].connect(Tone.Master);
  }


}

// draw
function draw() {

  // clear background
  background(0);

  // play note
  if ((frameCount % 10) == 0) {
    playNote();
  }


}

// mouse pressed
function mousePressed() {

  // play Note
  playNote(); // IMPORTANT: in Google Chrome at least one time a note must be triggerd through an interaction by the user!!!

}

function playNote() {
  // or number
  let freq = 80;
  let randomFactor = int(random(1, 8));
  synths[counterSynths].triggerAttackRelease(freq * randomFactor, 2);

  // counter synths
  counterSynths++;
  if (counterSynths >= 10) {
    counterSynths = 0;
  }
}