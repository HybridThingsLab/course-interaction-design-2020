let file, data;
let cols = 13, rows = 28, padding = 20;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
  file = loadJSON("data/DWD-Augsburg-2009-2019.json");
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
  background(30)
  fill(255)
  textSize(14)
  textStyle(BOLD)
  textAlign(CENTER)

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      let index = i * rows + j;

      fill(0, 170, 230, nm[index] / nmSorted[nmSorted.length - 1] * 255)
      
      let xPos = i * width / cols + textWidth(date[index]),
          yPos = j * height / rows + 20;

          console.log(xPos, yPos, date[index])
      
        
        text(date[index], xPos, yPos);
    }
  }

}
