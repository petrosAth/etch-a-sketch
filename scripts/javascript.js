let primaryMouseButtonDown = false;
const tools = ["colorPicker", "rainbow", "eraser"];
let drawingTool = tools["rainbow"];
let pressure = 20;

function getDimensions() {
  const sidePixelCount = prompt("Set the number of squares per side:", "");
  return Math.min(sidePixelCount, 100);
}

function getRandomRgbColor() {
  const randomRed = Math.floor(Math.random() * 255);
  const randomGreen = Math.floor(Math.random() * 255);
  const randomBlue = Math.floor(Math.random() * 255);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

function darkenColor(rgbColorString) {
  const rgbColor = rgbColorString.match(/\d+/g).map(Number);

  rgbColor.forEach((part, index) => {
    rgbColor[index] = Math.max(0, rgbColor[index] - 26);
  });
  rgbColorString = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;

  return rgbColorString;
}

function draw(event) {
  // if ( drawingTool ===  ) {
  //
  // }
  if (event.target.classList.contains("sketchboard__pixel--clicked")) {
    const darkenedBgColor = darkenColor(event.target.style.backgroundColor);

    event.target.style.backgroundColor = darkenedBgColor;
  } else {
    event.target.className = "sketchboard__pixel--clicked";
    event.target.style.backgroundColor = getRandomRgbColor();
  }
}

function enterPixel(event) {
  event.preventDefault();

  if (primaryMouseButtonDown) {
    draw(event);
  }
}

function clickPixel(event) {
  draw(event);
}

function monitorMouseOverPixels() {
  let pixels = document.querySelectorAll(".sketchboard__pixel");

  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseenter", enterPixel);
    pixel.addEventListener("mousedown", clickPixel);
  });
}

function setPrimaryMouseButtonState(event) {
  event.preventDefault();
  let flags = event.buttons !== undefined ? event.buttons : event.which;
  primaryMouseButtonDown = (flags & 1) === 1;
}

function monitorPrimaryMouseButtonState(area) {
  area.addEventListener("mousedown", setPrimaryMouseButtonState);
  area.addEventListener("mousemove", setPrimaryMouseButtonState);
  area.addEventListener("mouseup", setPrimaryMouseButtonState);
}

function monitorArea(area) {
  monitorPrimaryMouseButtonState(area);
  monitorMouseOverPixels();
}

function createPixels(area, sidePixelCount) {
  for (let i = 0; i < sidePixelCount * sidePixelCount; i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("sketchboard__pixel");
    area.append(pixel);
  }
}

function clearArea(area) {
  area.innerHTML = "";
}

function createArea(sidePixelCount) {
  let area = document.querySelector(".sketchboard__area");

  area.style.gridTemplateRows = `repeat(${sidePixelCount}, 1fr)`;
  area.style.gridTemplateColumns = `repeat(${sidePixelCount}, 1fr)`;

  clearArea(area);
  createPixels(area, sidePixelCount);
  monitorArea(area);
}

function sketch() {
  const clearArea = document.querySelector(".sketchboard__clear__clear-area");
  clearArea.addEventListener("click", () => {
    // let sidePixelCount = getDimensions();
    // createArea(sidePixelCount);
    createArea(16);
  });
}

createArea(8);
sketch();
