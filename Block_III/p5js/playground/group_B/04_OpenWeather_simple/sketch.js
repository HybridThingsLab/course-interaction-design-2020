// use date from openweather https://openweathermap.org
// create a free account to get your API key here: https://home.openweathermap.org/users/sign_up
// further instructions here: https://openweathermap.org/guide#how

// we're going to store the temperature
let temperature = 0;
// We're going to store text about the weather
let weather = "";
// json file from openweathermap.org
let json;

// preload
function preload() {
  // load data here
  // for example images, sounds, JSON files..

  // The URL for the JSON data from openweathermap.org (replace "imperial" with "metric" for celsius)
  // change this with your key!!!
  let apiKey = "8b7442a39a8d1591af2eaa935816e9a7";
  let url = "https://api.openweathermap.org/data/2.5/weather?id=2954172&units=metric&APPID=" + apiKey;
  json = loadJSON(url);
}

// setup
function setup() {

  // canvas
  createCanvas(600, 600);

  // get the temperature
  temperature = json.main.temp;
  console.log(json);

  // grab the description, look how we can "chain" calls.
  weather = json.weather[0].description;
  console.log(json.weather);

}

// draw
function draw() {

  // clear background
  background(0);

  // display all the stuff we want to display
  fill(255);
  text(json.name, 10, 50);
  text("Current temperature: " + temperature, 10, 70);
  text("Forecast: " + weather, 10, 90);



}