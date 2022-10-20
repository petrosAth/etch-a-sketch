let primaryMouseButtonDown = false;

function getSketchboardDimensions() {
  const size = 16;
  return Math.min(size, 100);
}

function enterSketchboardPixel(event) {
  event.preventDefault();
  event.target.classList.add("sketchboard__pixel--hover");

  if (primaryMouseButtonDown) {
    event.target.className = "sketchboard__pixel--clicked";
  }
}

function leaveSketchboardPixel(event) {
  event.target.classList.remove("sketchboard__pixel--hover");
}

function monitorMouseOverSketchboardPixels() {
  let sketchboardPixels = document.querySelectorAll(".sketchboard__pixel");

  sketchboardPixels.forEach((pixel) => {
    pixel.addEventListener("mouseenter", enterSketchboardPixel);
    pixel.addEventListener("mouseleave", leaveSketchboardPixel);
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

function monitorMouseOverSketchboardArea(sketchboardArea) {
  monitorPrimaryMouseButtonState(sketchboardArea);
  monitorMouseOverSketchboardPixels();
}

function createSketchboardArea() {
  let sketchboardArea = document.querySelector(".sketchboard__area");
  const size = getSketchboardDimensions();

  sketchboardArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  sketchboardArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    let sketchboardPixel = document.createElement("div");
    sketchboardPixel.classList.add("sketchboard__pixel");
    sketchboardArea.append(sketchboardPixel);
  }

  monitorMouseOverSketchboardArea(sketchboardArea);
}

createSketchboardArea();
