let primaryMouseButtonDown = false;

function setPrimaryMouseButtonState(event) {
  event.preventDefault();
  let flags = event.buttons !== undefined ? event.buttons : event.which;
  primaryMouseButtonDown = (flags & 1) === 1;
}

function monitorPrimaryMouseButtonState(sketchboard) {
  sketchboard.addEventListener("mousedown", setPrimaryMouseButtonState);
  sketchboard.addEventListener("mousemove", setPrimaryMouseButtonState);
  sketchboard.addEventListener("mouseup", setPrimaryMouseButtonState);
}

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

function monitorMouseOverSketchboard(sketchboard) {
  monitorPrimaryMouseButtonState(sketchboard);
  monitorMouseOverSketchboardPixels();
}

function createSketchboard() {
  let sketchboard = document.querySelector(".sketchboard");
  const size = getSketchboardDimensions();

  sketchboard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  sketchboard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    let sketchboardPixel = document.createElement("div");
    sketchboardPixel.classList.add("sketchboard__pixel");
    sketchboard.append(sketchboardPixel);
  }

  monitorMouseOverSketchboard(sketchboard);
}

createSketchboard();
