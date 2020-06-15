//##################################################################
// Programm:  Regentropfen
//            Das Programm erzeugt zufällig Regentropfen, die 
//            dann zum Boden fallen. 
//            Die Regentropfen sind Objekte der Klasse fallingDrop.
//##################################################################

//##################################################################
// Klasse ..... : fallingDrop
// Beschreibung : Objekt für einen Regentropfen mit Startposition,
//                Durchmesser und Fallhöhe
//                Erreicht der Tropfen den Boden wird das Property
//                canRemove gesetzt, so dass das Objekt vom Haupt-
//                programm ersetzt werden kann.
//##################################################################

class fallingDrop {
    constructor(posX, dropDiameter, maxY) {
      this.posX = posX;
      this.posY = 0;
      //this.dropDiameter = dropDiameter;
      this.dropSpeed = random(5,9);
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
      circle(this.posX, this.posY, 3, 3,5);
    }
  }
  
  //##################################################################
  // Hauptprogramm
  //##################################################################
  
  let canvasMaxX = 1280;
  let canvasMaxY = 800;
  let dropList = [];
  
  function setup() {
    createCanvas(canvasMaxX, canvasMaxY);
  }
  
  function draw() {
    background(132,164,203);
    //zufällig neue Tropfen erzeugen
    if (random(1, 35) <= 10) {
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
    print((dropList.length + 1) + ' Regentropfen fallen');
  }