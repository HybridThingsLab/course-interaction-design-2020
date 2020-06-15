// use date from openweather https://openweathermap.org
// create a free account to get your API key here: https://home.openweathermap.org/users/sign_up
// further instructions here: https://openweathermap.org/guide#how

// we're going to store the temperature
let temperature = 0;
// We're going to store text about the weather
let weather = "";
// json file from openweathermap.org
let json;
// url
let url;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..

  // The URL for the JSON data from openweathermap.org (replace "imperial" with "metric" for celsius)
  // change this with your key!!!
  let apiKey = "8b7442a39a8d1591af2eaa935816e9a7";
  // city ID (Augsburg)
  // find other City IDs here: https://openweathermap.org/find?q=
  // click on city and see ID in URL of browser
  let cityID = "3531673"; // Augsburg
  //let cityID = "4164138"; // Miami
  // URL
  url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&units=metric&APPID=" + apiKey;

  // initial load data
  loadJSON(url, updateData); // check callback "updateData" at the end of this script
}

// setup
function setup() {

  // canvas
  createCanvas(600, 600);

}

// draw
function draw() {

  // clear background
  background(0);
  // get the temperature
  temperature = json.main.temp;
  // grab the description, look how we can "chain" calls.
  weather = json.weather[0].description;
  // display all the stuff we want to display
  fill(255);
  text(json.name, 10, 50);
  text("Current temperature: " + temperature, 10, 70);
  text("Forecast: " + weather, 10, 90);

  // update data current weather
  if (frameCount % 61 == 0) {
    loadJSON(url, updateData); // check callback "updateData" at the end of this script
  }

}

// update date
function updateData(newData) {
  json = newData;
  console.log(json);
}