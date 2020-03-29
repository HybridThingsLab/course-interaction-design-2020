let file, data;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
  file = loadJSON("data/DWD-Augsburg-2009-2019.json");
}

// setup
function setup() {
  data = file.data
  // canvas
  createCanvas(800, 768);
  noLoop()
}

// draw
function draw() {
  console.log("draw")
  let currentYear;

  background(0)

  for (let i = 0; i < data.length; i++) {
    let xPos = i * width / data.length;
    // let newYear = data[i].MESS_DATUM.split("-")[0]
    let newYear = split(data[i].MESS_DATUM, '-')[0]

    if( data[i].MESS_DATUM.match("01-01") ) {
      strokeWeight(1);
      stroke(200);
      line(xPos, 0, xPos, height);
      currentYear = newYear;
      fill(255)
      text(newYear, xPos + 10, 20)
    }

    stroke(220, 220, 0);
    strokeWeight(width/data.length);
    line(xPos, height / 2, xPos, height/2 - data[i].FM * 3)
    stroke(200, 0, 220)
    line(xPos, height / 2, xPos, height/2 + data[i].TMK)

    // line(xPos, 0, 0, height)
  }

  strokeWeight(1)
  stroke(255)
  line(0, height / 2, width, height / 2)
}
