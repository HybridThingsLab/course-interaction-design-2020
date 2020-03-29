let file, data;
let cols = 13, rows = 28, padding = 20;
let font;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
  file = loadJSON("data/DWD-Augsburg-2009-2019.json");
  font = loadFont('./Envy Code R.ttf')
}

// setup
function setup() {
  // Get data from file
  data = file.data

  // We only need the NM value, so map the NM values accordingly, ignoring everything else
  nm = data.filter( (val) => val.MESS_DATUM.includes("2010") ).map((val) => val.NM)
  date = data.filter( (val) => val.MESS_DATUM.includes("2010") ).map( (val) => val.MESS_DATUM.split('-')[2] + "." + val.MESS_DATUM.split('-')[1] + "." + val.MESS_DATUM.split('-')[0])

  console.log(nm.length)
  // Sort the array, so we get our max and min values
  nmSorted = nm.concat().sort( (a, b) => a < b ? -1 : 1 )

  // make the canvas a little bigger
  createCanvas(windowWidth, windowHeight);
  noLoop()
}

// draw
function draw() {
  console.log()
  background(210)
  fill(255)
  textSize(14)
  textStyle(BOLD)
  textAlign(LEFT)
  noStroke()
  rectMode(CORNER)
  textFont(font)

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      let index = i * rows + j;
      
      let xPos = i * width / cols,
          yPos = j * height / rows;

          console.log(xPos + textWidth(date[index]) , yPos, date[index])
      
        fill(0, 170, 230, nm[index] / nmSorted[nmSorted.length - 1] * 255)
        rect(xPos, yPos, width / cols, height / rows)

        fill(200)
        text(date[index], xPos + 5, yPos + 18);
    }
  }

}
