// data
let file;
let year = 2018; // change here
let data;
let dataYear = [];

// visualization
let counterX = 0;
let counterY = 0;
let offsetX = 16;
let offsetY = 16;

// preload
function preload() {

  // load json file with weather data

  //file = loadJSON("data/DWD-Augsburg-2009-2019.json"); // >> run on (local) webserver
  file = loadJSON("https://raw.githubusercontent.com/HybridThingsLab/course-interaction-design/master/Block_I/data/DWD-Augsburg-2009-2019.json");

}

// setup
function setup() {

  // canvas
  createCanvas(1024, 768);
  noLoop(); // draw loop is just executed once

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

}

// draw
function draw() {

  // clear background
  background(0);

  // draw year
  fill(255);
  noStroke();
  textSize(14);
  text(year, offsetX, offsetY);

  // current month
  let lastMonth = "";

  // loop through weather data of year defined
  for (let i = 0; i < dataYear.length; i++) {

    // get current month
    let currentMonth = dataYear[i].MESS_DATUM.substr(5, 2);

    // check if new month
    if (currentMonth != lastMonth) {

      // counters position
      counterY += height / 13;
      counterX = 0;

      // show current month
      fill(0, 255, 0);
      noStroke();
      textSize(12);
      text(getMonth(currentMonth).toUpperCase(), offsetX + counterX, counterY);

      // set last month to current month
      lastMonth = currentMonth;
    }

    // GET VALUE(S) OF WEATHER DATA HERE!
    // for example get average temperature of each day (see JSON file for further data)
    let temperature = dataYear[i].TMK;

    // draw here (WHERE THE MAGIC HAPPENS!)
    fill(255);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text(temperature.toFixed(1), offsetX + counterX, counterY + offsetY); // 'toFixed()' used to always get a float for example '10.0'


    // counter x position
    counterX += width / 32;

  }


}

// custom functions
function getMonth(monthAsNumber) {

  let month = "";

  switch (monthAsNumber) {
    case '01':
      month = "Januar";
      break;
    case '02':
      month = "Februar";
      break;
    case '03':
      month = "März";
      break;
    case '04':
      month = "April";
      break;
    case '05':
      month = "Mai";
      break;
    case '06':
      month = "Juni";
      break;
    case '07':
      month = "Juli";
      break;
    case '08':
      month = "August";
      break;
    case '09':
      month = "September";
      break;
    case '10':
      month = "Oktober";
      break;
    case '11':
      month = "November";
      break;
    case '12':
      month = "Dezember";
      break;
    default:
      // code block
  }

  return month;

}