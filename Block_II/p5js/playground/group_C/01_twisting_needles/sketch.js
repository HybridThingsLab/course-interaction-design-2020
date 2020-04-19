let file, data;
let cols = 20, rows = 32;

// preload
function preload() {

}

// setup
function setup() {
  // make the canvas a little bigger
  createCanvas(windowWidth, windowHeight);
}

function drawCircle(x, y, direction) {
  let ratio = (x - mouseX) / (y - mouseY)
  let lineLen = 13
  let hyp = sqrt(sq(x - mouseX) + sq(y - mouseY))
  let scale = lineLen / hyp

  noStroke()
  colorMode(HSB)
  fill(200, map(720 - hyp, 0, width, 0, 255), map(720 - hyp, 0, width, 0, 255))
  circle(x, y, 30)
  stroke(255)
  strokeWeight(3)
  line(x, y, x + (mouseX - x) * scale, y + (mouseY - y) * scale )
}

// draw
function draw() {
  background(0)
  for (let i = 0; i <= rows; i++) {
    for(let j = 0; j <= cols; j++) {
      drawCircle(i * (width - 60) / rows + 30, j * (height - 60) / cols + 30, 0)
    }
  }
}
