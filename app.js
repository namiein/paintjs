const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("controls__color");
const color = document.getElementsByName("color")[0];
const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraseBtn = document.getElementById("jsErase");
const resetBtn = document.getElementById("jsReset");

const INITIAL_COLOR = "#2c2c2c";
canvas.width = document.getElementById("jsCanvas").offsetWidth;
canvas.height = document.getElementById("jsCanvas").offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let erasing = false;

const handleStartPainting = () => {
    painting = true;
};

const handleStopPainting = () => {
    painting = false;
};

// painting strokes
const onMouseMove = (e) => {
    const xCoord = e.offsetX;
    const yCoord = e.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(xCoord, yCoord);
    } else {
        ctx.lineTo(xCoord, yCoord);
        ctx.stroke();
    }
};

// change background color
const handleCanvasClick = () => {
    if (filling) {
        const div = document.getElementsByClassName("active")[0];
        ctx.fillStyle = div.style.backgroundColor !== ctx.strokeStyle ? div.style.backgroundColor : ctx.strokeStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};

// changing stroke/background color
const handleColorChange = (e) => {
    if (erasing) {
        erasing = false;
        eraseBtn.innerText = "Erase";
    }

    const div = document.getElementsByClassName("active")[0];
    div.classList.remove("active");
    const clicked = e.currentTarget;
    clicked.classList.add("active");

    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
};

// changing color from color input
const handleOtherColorChange = (e) => {
    const div = document.getElementsByClassName("active")[0];
    div.classList.remove("active");
    const clicked = e.currentTarget;
    clicked.classList.add("active");

    const color = e.target.value;
    ctx.strokeStyle = color;
};

// changing stroke width
const handleRangeChange = (e) => {
    const size = e.target.value;
    ctx.lineWidth = size;
};

// changing mode: paint mode or stroke mode
const handleModeChange = (e) => {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        const div = document.getElementsByClassName("active")[0];
        ctx.fillStyle = div.style.backgroundColor;
        filling = true;
        mode.innerText = "Paint";
    }
};

// right click not allowed
const handleContextMenu = (e) => {
    e.preventDefault();
};

// downloading image
const handleSave = (e) => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = `PaintJS[🎨]-${new Date().getTime()}.png`;
    link.click();
};

// erasing the stroke
// key point: the erasing stroke color === background color of canvas
const handleErase = () => {
    if (erasing) {
        erasing = false;
        eraseBtn.innerText = "Erase";
        const div = document.getElementsByClassName("active")[0];
        ctx.strokeStyle = div.style.backgroundColor;
    } else {
        erasing = true;
        eraseBtn.innerText = "Draw";
        ctx.strokeStyle = ctx.fillStyle;
    }
};

// Resetting the canvas to initial state (=== white canvas)
const handleReset = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", handleStartPainting);
    canvas.addEventListener("mouseup", handleStopPainting);
    canvas.addEventListener("mouseleave", handleStopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if (range) {
    range.addEventListener("change", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeChange);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSave);
}

if (eraseBtn) {
    eraseBtn.addEventListener("click", handleErase);
}

if (resetBtn) {
    resetBtn.addEventListener("click", handleReset);
}

Array.from(colors).forEach((color) => {
    color.addEventListener("click", handleColorChange);
});

if (color) {
    color.addEventListener("click", handleOtherColorChange);
    color.addEventListener("change", handleOtherColorChange);
}
