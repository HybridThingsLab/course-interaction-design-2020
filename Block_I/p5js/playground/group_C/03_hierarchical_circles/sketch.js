let file, data, yearAverage = [];

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..
  file = loadJSON("data/DWD-Augsburg-2009-2019.json");
}

// setup
function setup() {
  data = file.data;

  days = data.map( (val) => val.SDK );
  daysSorted = days.concat().sort( (a,b) => a < b ? -1 : 1 )
  for(let i = 2009; i <= 2019; i++) {
    yearAverage.push(data.concat().filter((val) => val.MESS_DATUM.includes(i)).map( (val) => val.SDK ).reduce((a,b) => a + b, 0) / 365)
  }
  print(yearAverage)

  // canvas
  createCanvas(windowWidth, windowHeight);
  noStroke()
  noLoop()
}

// draw
function draw() {
  console.log("draw")

  background(10, 130, 200)

  // fill(255)

  let prevArc = 0;
  for( let i = 0; i < days.length; i++) {
    fill(185, 105 + 150 * (days[i] / daysSorted[daysSorted.length - 1]), 0)
    
    arc(width/2, height/2, 600, 600, prevArc, i * TWO_PI / days.length)
    prevArc = i * TWO_PI / days.length
  }

  fill(10, 130, 200)
  circle(width/2, height/2, 410, 410)

  prevArc = 0
  for( let i = 0; i < yearAverage.length; i++) {
    console.log(105 + 150 * (yearAverage[i] / daysSorted[daysSorted.length - 1]))
    fill(185, 105 + 150 * (yearAverage[i] / daysSorted[daysSorted.length - 1]), 0)
    arc(width/2, height/2, 400, 400, prevArc, i * TWO_PI / yearAverage.length)
    prevArc = i * TWO_PI / yearAverage.length
  }

}
