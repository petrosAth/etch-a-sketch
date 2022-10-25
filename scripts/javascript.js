let primaryMouseButtonDown = false;
const tools = [
  "color-picker",
  "rainbow",
  "lighten",
  "darken",
  "eraser",
  "color",
];
let areaSize = 16;
const areaBg = "rgb(255, 255, 255)";
let drawingTool = "rainbow";
let drawingColor = "black";

function calculateDimensions() {
  if (window.innerWidth > window.innerHeight) {
    document.querySelector(".sketchboard").style.maxWidth = "90vh";
    document.querySelector(".sketchboard").style.maxHeight = "90vh";
  } else {
    document.querySelector(".sketchboard").style.maxWidth = "90vw";
    document.querySelector(".sketchboard").style.maxHeight = "90vw";
  }
}

function getRandomRgbColor() {
  const randomRed = Math.floor(Math.random() * 255);
  const randomGreen = Math.floor(Math.random() * 255);
  const randomBlue = Math.floor(Math.random() * 255);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

function changeLight(rgbColorString, lightChange) {
  const rgbColor = rgbColorString.match(/\d+/g).map(Number);

  rgbColor.forEach((part, index) => {
    rgbColor[index] = Math.max(0, rgbColor[index] + lightChange);
  });
  rgbColorString = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;

  return rgbColorString;
}

function draw(event) {
  let newBgColor;

  if (drawingTool === "lighten") {
    newBgColor = changeLight(event.target.style.backgroundColor, 26);
  }

  if (drawingTool === "darken") {
    newBgColor = changeLight(event.target.style.backgroundColor, -26);
  }

  if (drawingTool === "rainbow") {
    newBgColor = getRandomRgbColor();
  }

  if (drawingTool === "eraser") {
    newBgColor = areaBg;
  }

  if (drawingTool === "color") {
    newBgColor = drawingColor;
  }

  event.target.style.backgroundColor = newBgColor;
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
    pixel.style.backgroundColor = areaBg;
    area.append(pixel);
  }
}

function clearArea(area) {
  area.innerHTML = "";
}

function createArea(sidePixelCount) {
  sidePixelCount = sidePixelCount > 100 ? 100 : sidePixelCount;
  let area = document.querySelector(".sketchboard__area");

  area.style.gridTemplateRows = `repeat(${sidePixelCount}, 1fr)`;
  area.style.gridTemplateColumns = `repeat(${sidePixelCount}, 1fr)`;

  clearArea(area);
  createPixels(area, sidePixelCount);
  monitorArea(area);
}

function createTool(tool, value) {
  drawingTool = tool;

  if (tool === "color") {
    drawingColor = value;
  }

  if (tool === "sizeTool") {
    drawingTool = "rainbow";
    areaSize = value === "" ? 16 : value;
    createArea(areaSize);
  }
}

function getTool() {
  const clearArea = document.querySelector(".sketchboard__clear__clear-area");
  clearArea.addEventListener("click", () => createArea(areaSize));

  const sizeTool = document.querySelector(".sketchboard__tools__size");
  sizeTool.addEventListener("input", (event) =>
    createTool("sizeTool", event.target.value)
  );

  const colorPickerTool = document.querySelector(
    ".sketchboard__tools__color-picker"
  );
  colorPickerTool.addEventListener("change", (event) =>
    createTool("color", event.target.value)
  );

  const rainbowTool = document.querySelector(".sketchboard__tools__rainbow");
  rainbowTool.addEventListener("click", () => createTool("rainbow"));

  const lightenTool = document.querySelector(".sketchboard__tools__lighten");
  lightenTool.addEventListener("click", () => createTool("lighten"));

  const darkenTool = document.querySelector(".sketchboard__tools__darken");
  darkenTool.addEventListener("click", () => createTool("darken"));

  const eraserTool = document.querySelector(".sketchboard__tools__eraser");
  eraserTool.addEventListener("click", () => createTool("eraser"));

  const blackColor = document.querySelector(".sketchboard__colors__black");
  blackColor.style.backgroundColor = "rgb(0, 0, 0)";
  blackColor.addEventListener("click", () =>
    createTool("color", blackColor.style.backgroundColor)
  );

  const whiteColor = document.querySelector(".sketchboard__colors__white");
  whiteColor.style.backgroundColor = "rgb(255, 255, 255)";
  whiteColor.addEventListener("click", () =>
    createTool("color", whiteColor.style.backgroundColor)
  );

  const magentaColor = document.querySelector(".sketchboard__colors__magenta");
  magentaColor.style.backgroundColor = "rgb(255, 0, 255)";
  magentaColor.addEventListener("click", () =>
    createTool("color", magentaColor.style.backgroundColor)
  );

  const redColor = document.querySelector(".sketchboard__colors__red");
  redColor.style.backgroundColor = "rgb(255, 0, 0)";
  redColor.addEventListener("click", () =>
    createTool("color", redColor.style.backgroundColor)
  );

  const yellowColor = document.querySelector(".sketchboard__colors__yellow");
  yellowColor.style.backgroundColor = "rgb(255, 255, 0)";
  yellowColor.addEventListener("click", () =>
    createTool("color", yellowColor.style.backgroundColor)
  );

  const greenColor = document.querySelector(".sketchboard__colors__green");
  greenColor.style.backgroundColor = "rgb(0, 255, 0)";
  greenColor.addEventListener("click", () =>
    createTool("color", greenColor.style.backgroundColor)
  );

  const cyanColor = document.querySelector(".sketchboard__colors__cyan");
  cyanColor.style.backgroundColor = "rgb(0, 255, 255)";
  cyanColor.addEventListener("click", () =>
    createTool("color", cyanColor.style.backgroundColor)
  );

  const blueColor = document.querySelector(".sketchboard__colors__blue");
  blueColor.style.backgroundColor = "rgb(0, 0, 255)";
  blueColor.addEventListener("click", () =>
    createTool("color", blueColor.style.backgroundColor)
  );
}

calculateDimensions();
createArea(areaSize);
getTool();
