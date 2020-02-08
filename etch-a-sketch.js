function createCells(dimension) {
  const n = dimension ** 2;
  for (i = 0; i < n; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    document.querySelector(".container").appendChild(cell);
  }
}

function styleCells() {
  document.querySelectorAll(".cell").forEach(element => {
    element.style.backgroundColor = "white";
    element.style.height = "100%";
    element.style.width = "100%";
    element.addEventListener("mouseover", shadeCell);
  });
}

function styleContainer(dimension) {
  container = document.querySelector(".container");
  container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
  container.style.width = "980px";
  container.style.height = "980px";
  container.style.margin = "auto";
  container.style.gridGap = "1px";
  container.style.border = "1px solid #000";
  container.style.background = "#000";
}

function createContainer() {
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  container.style.display = "grid";
  document.body.appendChild(container);
}

function shadeCell(event) {
  cellColor = event.target.style.backgroundColor;
  if (cellColor == "white") {
    event.target.style.backgroundColor = getRandomColorRGB();
  } else {
    event.target.style.backgroundColor = darkenRGB(cellColor);
  }
}

function resizeCell(event) {
  dimension = parseInt(
    prompt("Enter a number for the desired squares per side of the sketchpad:"),
    10
  );
  if (isNaN(dimension)) return console.log("Please enter a valid number.");
  styleContainer(dimension);
  createCells(dimension);
  styleCells();
}

// color functions

function getRandomColorRGB() {
  let r, g, b;
  do {
    r = Math.round(Math.random() * 255);
    g = Math.round(Math.random() * 255);
    b = Math.round(Math.random() * 255);
  } while (r == 255 && b == 255 && g == 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenRGB(rgb) {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb
    .substr(4)
    .split(")")[0]
    .split(sep);
  let r = Math.round(rgb[0] * 0.75);
  let g = Math.round(rgb[1] * 0.75);
  let b = Math.round(rgb[2] * 0.75);
  return `rgb(${r}, ${g}, ${b})`;
}

// variables
let dimension = 16;

// add event listeners
document.querySelector("#queryButton").addEventListener("click", resizeCell);

// set up page
createContainer();
