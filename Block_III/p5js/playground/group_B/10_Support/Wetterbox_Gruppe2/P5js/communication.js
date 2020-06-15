// Temperture
let currentTemperature = 0.0;


//Sound
let song;
let modeS = 'restart';
let cs = 1;
let thunder;

//GEWITTER
let Lightning;
var timestamp = 0;
// let speed = 2;



//RAIN
let canvasMaxX = 400;
let canvasMaxY = 400;
let dropList = [];


//SNOW
let snowList = [];


//DRIZZLE
let drizzleList = [];




//NEBEL
let temperature = 0;
let weather = "";
let json;
let url;
//Bild
let nebel;
//Arduino
let serial; // variable to hold an instance of the serialport library
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let receivedValues = [];
let rotaryValue = 0;
let lightValue = 0;
let buttonValue = 0;
//NEBEL
function preload() {

    /*
    nebel = loadImage('Nebel.jpg');

    song = loadSound('rain-01.mp3');
    song.playMode(modeS);

    thunder = loadSound('gewitter.mp3');
    thunder.playMode(modeS);
*/

    let apiKey = "8b7442a39a8d1591af2eaa935816e9a7";

    //let cityID = "2954172"; // Augsburg
    let cityID = "4164138"; // Miami

    url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&units=metric&APPID=" + apiKey;
    loadJSON(url, updateData); // check callback "updateData" at the end of this script
}



function setup() {

    createCanvas(400, 400);


    Lightning = new light(2, 2, 3);



    //Arduino
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.list();
    serial.open("/dev/tty.usbmodem141101"); // On Mac it may be something like this

    // Here are the callbacks that you can register > see also "libraries/serial.js"
    serial.on('connected', serverConnected); // When we connect to the underlying server  
    serial.on('list', gotList); // When we get a list of serial ports that are available
    serial.on('data', gotData); // When we get some data from the serial port
    serial.on('error', gotError); // When or if we get an error
    serial.on('open', gotOpen); // When our serial port is opened and ready for read/write
    serial.on('close', gotClose);
    //serial.on('rawdata', gotRawData); // Callback to get the raw data, as it comes in for handling yourself

}




function draw() {
    //gewitter();
    rain();
    //snow();
    //sunshine();
    //drizzle();
    //nebelin();
    //soundLeise();
    //thunderStorm();

    // read latest serial data
    // Split the Stuff we received into seperate values, we seperated them in Arduino with a blank space
    receivedValues = split(latestData, " "); // for now just one values is sent from Arduino
    rotaryValue = receivedValues[0];
    lightValue = receivedValues[1];
    buttonValue = receivedValues[2];

    // get city
    let cityID = map(rotaryValue, 0, 1023, 1, 10);
    cityID = round(cityID);

    // empfehlung je nach cityID bestimmte URL setzten über z.B. switch Case


    // update data current weather
    if (frameCount % 61 == 0) {
        loadJSON(url, updateData); // check callback "updateData" at the end of this script
    }

    // get current temperature
    currentTemperature = json.main.temp;
    console.log(currentTemperature);


    // test sending values to Arduino
    let red = 255;
    let green = 255;
    let blue = 255;

    if (frameCount % 10 == 0) {
        serial.write("CONTROL");
        serial.write(" ");
        serial.write(str(red)); // red
        serial.write(" ");
        serial.write(str(green)); // green
        serial.write(" ");
        serial.write(str(blue)); // blue
        serial.write(" ");
        serial.write(str(currentTemperature)); // current temperature
        serial.write(10); // to finish your message, send a "line feed"
    }

}




function gewitter() {

    background(0, 0, 40, 20);
    if (millis() - timestamp > 1000) {
        Lightning = new light(2, 2, 3);
        timestamp = millis();
    } else {

        Lightning.move();
        Lightning.display();
    }
}


function rain() {

    background(100, 112, 121);
    //zufällig neue Tropfen erzeugen
    if (random(1, 1) <= 50) {
        //im Array nach dem nächsten Regentropfen suchen, der ersetzt werden kann
        let indexErstezen = -1;
        for (let i = 0; i < dropList.length; i++) {
            if (dropList[i].isRemoved()) {
                indexErstezen = i; //freien Index merken für das neue Objekt
                i = dropList.length; //durch diese Zuweisung wird die Schleife im nächsten Durchlauf
                //verlassen. Damit wird immer nur bis zum ersten freien Platz
                //im Array gesucht.
            }
        }

        if (indexErstezen == -1) {
            indexErstezen = dropList.length; //Da das Array mit dem Index 0 beginnt, ist die Länge
            //des Array immer um eins größer als der höchste 
            //Index-Wert... let array[0]=1 -> array.length = 1
        }
        dropList[indexErstezen] = new fallingDrop(random(1, canvasMaxX), random(2, 10), canvasMaxY);
    }

    //Tropfen fallen lassen, wenn es denn mindestens einen gibt
    if (dropList.length > 0) {
        for (let i = 0; i < dropList.length; i++) {
            if (!dropList[i].checkRemove()) {
                dropList[i].moveMe(true);
            }
        }
    }

    //Anzahl der Regentropfen ausgeben
    //print((dropList.length + 1) + ' Regentropfen fallen');
    //console.log(dropList[0].posY);
}


function snow() {

    background(175, 191, 203);
    //zufällig neue Tropfen erzeugen
    if (random(1, 20) <= 10) {
        //im Array nach dem nächsten Regentropfen suchen, der ersetzt werden kann
        let indexErstezen = -1;
        for (let i = 0; i < snowList.length; i++) {
            if (snowList[i].isRemoved()) {
                indexErstezen = i; //freien Index merken für das neue Objekt
                i = snowList.length; //durch diese Zuweisung wird die Schleife im nächsten Durchlauf
                //verlassen. Damit wird immer nur bis zum ersten freien Platz
                //im Array gesucht.
            }
        }
        if (indexErstezen == -1) {
            indexErstezen = snowList.length; //Da das Array mit dem Index 0 beginnt, ist die Länge
            //des Array immer um eins größer als der höchste 
            //Index-Wert... let array[0]=1 -> array.length = 1
        }
        snowList[indexErstezen] = new snowfalling(random(1, canvasMaxX), random(2, 10), canvasMaxY);
    }

    //Tropfen fallen lassen, wenn es denn mindestens einen gibt
    if (snowList.length > 0) {
        for (let i = 0; i < snowList.length; i++) {
            if (!snowList[i].checkRemove()) {
                snowList[i].moveMe(true);
            }
        }
    }

    //Anzahl der Regentropfen ausgeben
    //print((snowList.length + 1) + ' Regentropfen fallen');

}


function sunshine() {

    background(0, 165, 240);
}


function drizzle() {

    background(132, 164, 203);
    //zufällig neue Tropfen erzeugen
    if (random(1, 35) <= 10) {
        //im Array nach dem nächsten Regentropfen suchen, der ersetzt werden kann
        let indexErstezen = -1;
        for (let i = 0; i < drizzleList.length; i++) {
            if (drizzleList[i].isRemoved()) {
                indexErstezen = i; //freien Index merken für das neue Objekt
                i = drizzleList.length; //durch diese Zuweisung wird die Schleife im nächsten Durchlauf
                //verlassen. Damit wird immer nur bis zum ersten freien Platz
                //im Array gesucht.
            }
        }
        if (indexErstezen == -1) {
            indexErstezen = drizzleList.length; //Da das Array mit dem Index 0 beginnt, ist die Länge
            //des Array immer um eins größer als der höchste 
            //Index-Wert... let array[0]=1 -> array.length = 1
        }
        drizzleList[indexErstezen] = new drizzlefalling(random(1, canvasMaxX), random(2, 10), canvasMaxY);
    }

    //Tropfen fallen lassen, wenn es denn mindestens einen gibt
    if (drizzleList.length > 0) {
        for (let i = 0; i < drizzleList.length; i++) {
            if (!drizzleList[i].checkRemove()) {
                drizzleList[i].moveMe(true);
            }
        }
    }

    //Anzahl der Regentropfen ausgeben
    //print((dropList.length + 1) + ' Regentropfen fallen');

}


function nebelin() {

    //Arduino
    let receivedValues = split(latestData, " ");

    // change background 
    let backgroundValue = map(receivedValues[0], 0, 1023, 0, 1000);
    image(nebel, 0, 0, 800, 400, backgroundValue);


    temperature = json.main.feels_like;
    weather = json.weather[0].description;

    if (frameCount % 61 == 0) {
        loadJSON(url, updateData);
    }

}

// update date !!!!!!!!!
function updateData(newData) {
    json = newData;
    //console.log(json);
}

//NEBEL Arduino
function gotData() {
    let currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    latestData = currentString; // save it for the draw method
}



function soundLeise() {
    if (cs == 1) {
        song.amp(0.1);
        song.play();
        cs--;
    }
}

function soundNormal() {
    if (cs == 1) {
        song.amp(0.6);
        song.play();
        cs--;
    }
}

function soundLaut() {
    if (cs == 1) {
        song.amp(1);
        song.play();
        cs--;
    }
}

function thunderStorm() {
    if (cs == 1) {
        thunder.amp(0.8);
        thunder.play();
        cs--;
    }
}

//GEWITTER
class light {

    constructor(x, y, r) {

        this.pos = createVector(1, 0.1);

        this.vel = createVector(-5, 5);

        this.acc = createVector(0.1, 0.1);

        // this.x = x;

        // this.y = y;

        this.r = r;

    }

    move() {

        // this.x += random(-50, 100);

        // this.y += random(-50, 100);

        this.acc = createVector(random(-5, 20), random(-2, 10));

        this.acc.mult(random(-0.1, 1));



        this.pos.add(this.vel);

        this.vel.add(this.acc);



    }

    display() {

        noStroke();

        ellipse(this.pos.x, this.pos.y, this.r / 2, this.r * 60);

    }

}


//RAIN
class fallingDrop {
    constructor(posX, dropDiameter, maxY) {
        this.posX = posX;
        this.posY = 0;
        this.dropDiameter = dropDiameter;
        this.dropSpeed = random(15, 20);
        this.maxY = maxY;
        this.dropColor = color(0, 0, 255);
        this.canRemove = false;
    }

    //Gibt true zurück, wenn der Regentropfen nicht mehr angezeigt wird,
    //also durch einen neuen Tropfen ersetzt werden kann.
    isRemoved() {
        return this.canRemove;
    }

    //Prüft, ob der Regentropfen am Boden angekommen ist.
    checkRemove() {
        if (this.posY >= this.maxY) {
            this.canRemove = true;
            return true;
        } else {
            return false;
        }
    }

    //Löst die Bewegung des Regentropfen aus und kann auch gleich das
    //Zeichnen anstoßen.
    moveMe(andDraw) {
        this.posY = this.posY + this.dropSpeed;
        if (andDraw) {
            this.drawMe();
        }
    }

    //Zeichnet den Regentropfen an seiner aktuellen Position.
    drawMe() {
        fill(this.dropColor);
        noStroke();
        circle(this.posX, this.posY, this.dropDiameter);
    }
}


//SNOW
class snowfalling {
    constructor(posX, dropDiameter, maxY) {
        this.posX = posX;
        this.posY = 0;
        this.dropDiameter = dropDiameter;
        this.dropSpeed = random(3, 5);
        this.maxY = maxY;
        this.dropColor = color(255);
        this.canRemove = false;
    }

    //Gibt true zurück, wenn der Regentropfen nicht mehr angezeigt wird,
    //also durch einen neuen Tropfen ersetzt werden kann.
    isRemoved() {
        return this.canRemove;
    }

    //Prüft, ob der Regentropfen am Boden angekommen ist.
    checkRemove() {
        if (this.posY >= this.maxY) {
            this.canRemove = true;
            return true;
        } else {
            return false;
        }
    }

    //Löst die Bewegung des Regentropfen aus und kann auch gleich das
    //Zeichnen anstoßen.
    moveMe(andDraw) {
        this.posY = this.posY + this.dropSpeed;
        if (andDraw) {
            this.drawMe();
        }
    }

    //Zeichnet den Regentropfen an seiner aktuellen Position.
    drawMe() {
        fill(this.dropColor);
        noStroke();
        circle(this.posX, this.posY, this.dropDiameter);
    }
}


//DRIZZLE
class drizzlefalling {
    constructor(posX, dropDiameter, maxY) {
        this.posX = posX;
        this.posY = 0;
        //this.dropDiameter = dropDiameter;
        this.dropSpeed = random(5, 9);
        this.maxY = maxY;
        this.dropColor = color(0, 0, 255);
        this.canRemove = false;
    }

    //Gibt true zurück, wenn der Regentropfen nicht mehr angezeigt wird,
    //also durch einen neuen Tropfen ersetzt werden kann.
    isRemoved() {
        return this.canRemove;
    }

    //Prüft, ob der Regentropfen am Boden angekommen ist.
    checkRemove() {
        if (this.posY >= this.maxY) {
            this.canRemove = true;
            return true;
        } else {
            return false;
        }
    }

    //Löst die Bewegung des Regentropfen aus und kann auch gleich das
    //Zeichnen anstoßen.
    moveMe(andDraw) {
        this.posY = this.posY + this.dropSpeed;
        if (andDraw) {
            this.drawMe();
        }
    }

    //Zeichnet den Regentropfen an seiner aktuellen Position.
    drawMe() {
        fill(this.dropColor);
        noStroke();
        circle(this.posX, this.posY, 3, 3, 5);
    }
}