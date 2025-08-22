const svg = document.getElementById("drawing-area");
const clearBtn = document.getElementById("clearBtn");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");

let drawing = false;
let path;

svg.addEventListener("mousedown", (e) => {
  drawing = true;
  const point = getMousePosition(e);
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", `M ${point.x} ${point.y}`);
  path.setAttribute("stroke", colorPicker.value);
  path.setAttribute("stroke-width", brushSize.value);
  path.setAttribute("fill", "none");
  svg.appendChild(path);
});

svg.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const point = getMousePosition(e);
  let d = path.getAttribute("d");
  path.setAttribute("d", `${d} L ${point.x} ${point.y}`);
});

svg.addEventListener("mouseup", () => {
  drawing = false;
});

svg.addEventListener("mouseleave", () => {
  drawing = false;
});

clearBtn.addEventListener("click", () => {
  svg.innerHTML = "";
});

function getMousePosition(e) {
  const rect = svg.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
