// setup
function setup() {
  // Setzt den Canvas auf die Gesamtgröße des Fensters
  createCanvas(windowWidth, windowHeight);

  // Macht es einfacher, Objekte zentriert zu positionieren.
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER)
}

// Sorgt dafür, dass der Canvas richtig resized wird
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function windowSize() {
  let small = 400, medium = 900, big = 1300;
  if(width < small) {
    return 0;
  } else if (width < medium) {
    return 1
  } else if (width < big) {
    return 2
  } else {
    return 3
  }
}

function drawRects() {
  noStroke();
  let rectColor = "#7f7b82",
      textColor = "#fff";
  
  // Immer zentriert
  fill(rectColor);
  rect(width/2, height/2, 300, 120, 16);
  fill(textColor);
  textSize(18);
  text("I'm always centered", width/2, height/2);

  // Immer 20 von unten und 20 von rechts positioniert
  let rectWidth = 400,
      rectHeight = 120,
      rectX = width - rectWidth/2 - 20,
      rectY = height - rectHeight/2 - 20;
  fill(rectColor);
  rect(rectX, rectY, rectWidth, rectHeight, 16);
  fill(textColor);
  text("I'm always 20px from bottom and right", rectX, rectY);

  // Vollbild rect
  fill(rectColor)
  rect(width / 2, rectHeight / 2 + 20, width - 40, rectHeight, 16);
  fill(textColor)
  // Variabler text abhängig von der Breite. Die x ? y : z Schreibweise ist kurz für if (x) { y } else { z }. Siehe: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  text(width > 1000 ? "I'm always 20px from left top bottom and right and always veeeeeeeery long" : "But now I'm too small...", width / 2, rectHeight / 2 + 20)

  // Wenn man etwas ausblenden muss, wenn es keinen Platz mehr gibt ...
  if( windowSize() > 2 ) {
    fill(rectColor);
    rect(20 + 500 / 2, height / 2, 500, 200, 16);
    fill(textColor);
    text("I'm only visible on medium sized screens and up", 20 + 500 / 2, height / 2);
  } else {
  // Und es mit etwas anderem ersetzen muss.
    fill(rectColor);
    rect(20 + 100 / 2, height / 2, 100, 60, 16);
    fill(textColor)
    textSize(10);
    text("I'm only visble on small screens", 20 + 100 / 2, height / 2, 100, 60);
  }
}

// draw
function draw() {
  background("#444554")
  drawRects();
}
