// library matter.js used > included in index.html
// see also https://github.com/b-g/p5-matter-examples

// data
let file;
let year = 2018; // change here
let data;
let dataYear = [];

// visualization
let canvas;
let counterX = 0;
let zoom = 10.0;

// physics engine
let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Mouse = Matter.Mouse;
let MouseConstraint = Matter.MouseConstraint;
let engine;
let ground;

// boxes
let boxes = [];

// preload
function preload() {

  // load json file with weather data

  //file = loadJSON("data/DWD-Augsburg-2009-2019.json"); // >> run on (local) webserver
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");

}

// setup
function setup() {

  // canvas
  canvas = createCanvas(1024, 768);

  // get all weather data
  data = file.data;

  // loop through all data
  for (let i = 0; i < data.length; i++) {

    // get current year
    let currentYear = data[i].MESS_DATUM.substr(0, 4);

    // check if specific year
    if (currentYear == year) {
      // push data into array
      dataYear.push(data[i]);
    }

  }

  // create an engine
  engine = Engine.create();

  // create boxes
  // loop through datas
  for (let i = 0; i < dataYear.length; i++) {

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get max wind
    let wind = dataYear[i].FX;
    wind = wind * zoom;

    // add box
    boxes.push(Bodies.rectangle(counterX, height / 2 - wind / 2 - 3, 2, wind));

    // counter X
    counterX += width / dataYear.length;

  }
  // add to world
  World.add(engine.world, boxes);

  // ground
  ground = Bodies.rectangle(width / 2, height / 2, canvas.width, 6, {
    isStatic: true,
    angle: Math.PI * 0.00
  });
  // add to world
  World.add(engine.world, ground);

  // setup mouse
  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: {
      stiffness: 0.05,
      angularStiffness: 0
    }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);

}

// draw
function draw() {

  // clear background
  background(0);

  // draw FPS
  noStroke();
  fill(255);
  textSize(12);
  text("FPS: " + int(frameRate()), 8, 16);

  // draw boxes
  fill(255);
  for (let i = 0; i < boxes.length; i++) {
    drawVertices(boxes[i].vertices);
  }

  // draw ground
  fill(0, 255, 0);
  drawVertices(ground.vertices);

  // draw mouse
  drawMouse(mouseConstraint);

}

function drawMouse(mouseConstraint) {
  if (mouseConstraint.body) {
    var pos = mouseConstraint.body.position;
    var offset = mouseConstraint.constraint.pointB;
    var m = mouseConstraint.mouse.position;
    stroke(0, 255, 0);
    strokeWeight(2);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}