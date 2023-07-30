const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");





ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.width = innerWidth;
canvas.height = innerHeight;


const width = innerWidth - 120;
const height = innerHeight - 400;


canvas.width = width;
canvas.height = height;

canvas.style.margin = "20px";
canvas.style.border = ".5px solid lightgray";
canvas.style.cursor = 'crosshair';
canvas.style.borderRadius = "15px"
canvas.style.fillStyle = "white"
let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

ctx.lineWidth = 1;
ctx.lineCap = "round";
ctx.lineJoin = "round";
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}



if (canvas) {
  canvas.addEventListener("touchmove", touchMove, false);
  canvas.addEventListener("touchstart", touchStart, false);
  canvas.addEventListener("touchend", touchEnd, false);
}

function getTouchPos(e) {
    return {
        x: e.touches[0].clientX - e.target.offsetLeft,
        y: e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop
    }
}

function touchStart(e) {
    e.preventDefault();
    drawing = true;
    const { x, y } = getTouchPos(e);
    startX = x;
    startY = y;
}

function touchMove(e) {
    if(!drawing) return;
    const { x, y } = getTouchPos(e);
    draw(x, y);
    startX = x;
    startY = y;
}

function touchEnd(e) {
    if(!drawing) return;
    // 점을 찍을 경우 위해 마지막에 점을 찍는다.
    // touchEnd 이벤트의 경우 위치정보가 없어서 startX, startY를 가져와서 점을 찍는다.
    ctx.beginPath();
    ctx.arc(startX, startY, ctx.lineWidth/2, 0, 2*Math.PI);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    drawing = false;
}
  



document.querySelector("#buttons").style.marginLeft = "15px";
const buttons = [
  "clear",
  "save"

];
let lineColor = "black";

buttons.forEach((content) => {
  let button = document.querySelector(`.${content}`);
  
button.style.cursor = 'pointer';
  
  if (content === "clear" || content === "save") {
    
    button.style.background = "rgba(100,100,100,0.1)";
  } else {
    button.style.background = content;
  }
  button.style.color = "black";
  button.style.display = "inline-block";
  button.style.lineHeight = "100px";
  button.style.fontSize = "15px"
  button.style.fontFamily = "Roboto Mono, monospace"
  button.style.textAlign = "center";
  button.style.width = "35px";
  button.style.height = "35px";
  button.style.borderRadius = "25px";
  button.style.border = "none";
  button.style.boxShadow = "none";
  button.style.margin = "0 15px 0 15px"


  button.onclick = () => {
    ctx.strokeStyle = content;
    lineColor = content;
  };
});




ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height);



document.querySelector(".clear").onclick = () => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

saveBtn.addEventListener("click", handleSaveBtn);
 
function handleSaveBtn() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "your_artwork";
    link.click();
}

function undoRedo(pushStack,popStack) {
  pushStack.push(popStack.pop());
  source = getTopImage();
  img.src = source;
  offScreenCTX.clearRect(0,0,offScreenCVS.width,offScreenCVS.height);
  offScreenCTX.drawImage(img,0,0,offScreenCVS.width,offScreenCVS.height);
  renderImage();
}
