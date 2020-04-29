var ft

// preload
function preload() {

}

// setup
function setup() {
  // opt Objekt erstellen, dass der Fountain übergeben wird.
  var opt = {
    // Name des Particles
    name: "particle",

    // Der minimale und maximale Winkel, mit welchem die Partikel aus der Fountain erscheinen. Soll der Winkel immer gleich sein, den gleichen Wert 2 Mal verwenden z.B. [10,10]
    angle:[0, 180],

    // Die Farben, die das Particle im Laufe seines Lebens haben soll. Bei einer Farbe ändert sich die Farbe nicht, bei zwei Farben hat das Particle die erste Hälfte der Zeit die erste, die zweite Hälfte die zweite Farbe. Bei 3 dann 1/3 1/3 1/3 usw... Man kann unendlich viele Farben angeben.
    colors: ["#fff", "#aaa", "#999", "#555", "#222"],

    // Streuung der Particles. Bei zwei Werten wird die Breite und die Höhe bestimmt. Mit vier Werten kann man Minimum und Maximum setzen , [0,0] ist ein Punkt
    dxy: [18,0],

    // Pfad zu einem Bild, das als Particle verwendet werden soll
    // file: '../images/image.png',

    // Die Schwerkraft, die auf die Partikel wirkt, liegt wischen 0 und 1.
    gravity: 0.01,
    
    // Die Anzahl an Frames, die das Particle leben soll.
    lifetime: 500,

    // Wie viele Particles maximal generiert werden sollen.
    limit: 10000,

    // Paarwerte, die angeben, wie schnell die Particles generiert werden sollen. Lese: 100 bei 10 pro Step, dann 100 bei 20 pro Stel, dann wieder 100 bei 10 pro Step etc.
    rate: [100,10, 100,20],

    // Die Rotation, die die Particles nach dem Genrieren erhalten
    rotation: 30,

    // Welche Form die Particles haben sollen. Es gibt "ellipse","ellipse2", "image", "point", "rect"
    shape: "ellipse2",

    // Minimale und maximale Größe, per Zufall gewählt. Wenn sich die Größe nicht ändern soll, dann gleichen Wert verwenden, z.B. [3,3]
    size: [5,10],

    // Die wahrscheinlichkeit mit der sich die Größe nach jedem Zyklus ändert. Am Besten bei 1 belassen
    sizePercent: 1,

    // Die Geschwindigkeit in y-Richtung, mit der die Particles nach dem Genrieren starten. Standard ist 1.
    speed: 4,

    // Die Geschwindigkeit in x-Richtung, mit der die Particles nach dem Genrieren starten. Standard ist 1.
    speedx: 2,

    // Position des Fountain auf dem Bildschirm von links, 0 = ganz links, 1 = ganz rechts
    x: 0,

    // Position des Fountains auf dem Bildschirm von oben, 0 = ganz oben, 1 = ganz unten
    y: 0

  };

  // Erstellt einen neuen Emitter ohne (also null als) JSON Daten, mit opt als Optionen an der Stelle 0,0 (oben links)
  ft = new Fountain(null, opt, 0, 0)

  createCanvas(windowWidth, windowHeight);
}

// draw
function draw() {
  background(0)
  // Zeichne alle Particles
  ft.Draw()

  // Erstelle neue Particles
  ft.Create()

  // Wende Physik (Gravity, Velocity, Speed etc. auf alle Particles an.)
  ft.Step()
  
  fill("white")
  text(`Active Particles: ${ ft.length }`, 10, windowHeight - 60)
  text(`Particles left to generate: ${ ft.left }`, 10, windowHeight - 40)
  text(`Done: ${ ft.done }`, 10, windowHeight - 20)
}
