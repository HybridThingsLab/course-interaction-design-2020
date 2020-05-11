// Gesamtanzahl der Gebäude
let buildings = 10

// Anzahl Regenpartikel. Mehr Partikel, mehr Regen.
let rain = 100

// Nach wie vielen Frames der Regen neu generiert werden soll.
let renderEveryFrames = 30

// Positioning Arrays
let heightArray, rainArray;

// UI Slider
let rainSlider, frameSlider;

// custom functions

// Zeichnet die "Stadt"
function drawCity(numberOfBuildings) {
  // Farbe der Gebäude
  fill("#020232");
  noStroke()

  // Corners mode lässt ein Rechteck über 2 Eckpunkte zeichnen
  rectMode(CORNERS)

  // Zeichnet die Gebäude
  for(let i = 0; i < numberOfBuildings; i++) {
    rect(i * (width / numberOfBuildings), // Erste x-Koordinate startet bei x = 0 und geht immer weiter
        height, // Erste y-Koordinate ist immer ganz unten
        i * (width / numberOfBuildings) + 1 + width / numberOfBuildings, // Zweite x-Koordinate ist ie Gebäudebreite + 1px, um die Linien dazwischen zu vermeiden
        heightArray[i]) // Zweite y-Koordinate wird aus dem heightArray genommen, das aus random Höhen generiert wurde
  }
}

// Funktion, um die Position der regentropfen zu generieren
function generateRain(rainAmount) {
  // Kurzschreibweise, um ein array zu generieren: https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
  // In dem Fall werden kleinere Arrays zurückgegeben in der Form [x-Pos, y-Pos]
  rainArray = Array.from({length: rainAmount}, () => [round(random(50, windowWidth - 50)), round(random(50, windowHeight - 50))]);
}

function drawRain(rainAmount) {
  // Zuerst wird gecheck, ob die Positionen der Regentropfen neu generiert werden sollen. Dies passier jeden x-ten Frame. Der Wert kann über den Slider geändert werden
  if(frameCount % frameSlider.value() == 0) {
    // Wenn ja, generiere den Regen (siehe Funktion oben drüber)
    generateRain(rainAmount)
  }

  // Hier wird der Regen tatsächlich gezeichnet
  for( let i = 0; i < rainAmount; i++ ) {
    // x und y Position stammen aus dem generierten Rain array
    let x = rainArray[i][0];
    let y = rainArray[i][1];
    strokeWeight(3);
    stroke("white");
    line(x, y, x + 40, y + 60);
  }
}

// Zwichnet die 2 Slider
function drawUI() {
  noStroke()
  fill("#efefef");
  text("Rain particles: " + rainSlider.value(), 40, height - 70);
  text("Render Every " + frameSlider.value() + " frames", 200, height - 70);
}

// p5.js functions
function setup() {
  // Canvas
  createCanvas(windowWidth, windowHeight);
  // Zu Beginn muss der Regen einmal generiert werden, sonst gibt es einen Fehler
  generateRain(rain)

  // Slider Setup
  rainSlider = createSlider(0, 200, rain);
  rainSlider.position(40, height - 60);
  // Hotfix: Damit nach dem ändern des Sliders kein Fehler auftritt, weil jetzt mehr Regentropfen generiert werden sollen, als das rainArray Positionen hat, wird das rainArray mit der neuen Länger generiert, nachdem sich der Wert des Sliders geändert hat
  rainSlider.input(() => {
    // Generiere den Regen
    generateRain(rainSlider.value())
  })

  frameSlider = createSlider(0, 200, renderEveryFrames);
  frameSlider.position(200, height - 60);

  // Generiere random Gebäudehöhen
  heightArray = Array.from({length: buildings}, () => random(windowHeight/10, windowHeight/1.5));
}

function windowResized() {
  // Gebäudeöhen müssen angepasst werden
  heightArray = Array.from({length: buildings}, () => random(windowHeight/10, windowHeight/1.5));
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#0075be");
  drawCity(buildings);
  drawRain(rainSlider.value());
  drawUI();
}
