let primaryMouseButtonDown = false;

function getSketchboardDimensions() {
  const sidePixelCount = prompt("Set the number of squares per side:", "");
  return Math.min(sidePixelCount, 100);
}

function getRandomRgbColor() {
  const randomRed = Math.floor(Math.random() * 255);
  const randomGreen = Math.floor(Math.random() * 255);
  const randomBlue = Math.floor(Math.random() * 255);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}


  if (primaryMouseButtonDown) {
    // event.target.className = "sketchboard__pixel--clicked";
    event.target.style.backgroundColor = getRandomRgbColor();
  }
}

function enterSketchboardPixel(event) {
  event.preventDefault();

}

function clickSketchboardPixel(event) {
  // event.target.className = "sketchboard__pixel--clicked";
  event.target.style.backgroundColor = getRandomRgbColor();
}

function monitorMouseOverSketchboardPixels() {
  let sketchboardPixels = document.querySelectorAll(".sketchboard__pixel");

  sketchboardPixels.forEach((pixel) => {
    pixel.addEventListener("mouseenter", enterSketchboardPixel);
    pixel.addEventListener("mousedown", clickSketchboardPixel);
  });
}

function setPrimaryMouseButtonState(event) {
  event.preventDefault();
  let flags = event.buttons !== undefined ? event.buttons : event.which;
  primaryMouseButtonDown = (flags & 1) === 1;
}

function monitorPrimaryMouseButtonState(sketchboardArea) {
  sketchboardArea.addEventListener("mousedown", setPrimaryMouseButtonState);
  sketchboardArea.addEventListener("mousemove", setPrimaryMouseButtonState);
  sketchboardArea.addEventListener("mouseup", setPrimaryMouseButtonState);
}

function monitorSketchboardArea(sketchboardArea) {
  monitorPrimaryMouseButtonState(sketchboardArea);
  monitorMouseOverSketchboardPixels();
}

function createSketchboardPixels(sketchboardArea, sidePixelCount) {
  for (let i = 0; i < sidePixelCount * sidePixelCount; i++) {
    let sketchboardPixel = document.createElement("div");
    sketchboardPixel.classList.add("sketchboard__pixel");
    sketchboardArea.append(sketchboardPixel);
  }
}

function clearSketchboardArea(sketchboardArea) {
  sketchboardArea.innerHTML = "";
}

function createSketchboardArea() {
  let sketchboardArea = document.querySelector(".sketchboard__area");
  let sidePixelCount = getSketchboardDimensions();

  sketchboardArea.style.gridTemplateRows = `repeat(${sidePixelCount}, 1fr)`;
  sketchboardArea.style.gridTemplateColumns = `repeat(${sidePixelCount}, 1fr)`;

  clearSketchboardArea(sketchboardArea);
  createSketchboardPixels(sketchboardArea, sidePixelCount);
  monitorSketchboardArea(sketchboardArea);
}

function sketch() {
  const newBoardButton = document.querySelector(
    ".sketchboard__buttons__new-board"
  );
  newBoardButton.addEventListener("click", createSketchboardArea);
}

sketch();
