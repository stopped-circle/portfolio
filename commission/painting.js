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













function startup() {
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchmove", handleMove, false);
  log("Touch Start.");
}


var ongoingTouches = [];


function handleStart(evt) {
  evt.preventDefault();
  log("touchstart.");
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
    log("touchstart:" + i + ".");
  }
}






function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      log("continuing touch " + idx);
      ctx.beginPath();
      log(
        "ctx.moveTo(" +
          ongoingTouches[idx].pageX +
          ", " +
          ongoingTouches[idx].pageY +
          ");",
      );
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
      log(".");
    } else {
      log("can't figure out which touch to continue");
    }
  }
}




function handleEnd(evt) {
  evt.preventDefault();
  log("touchend");
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8); // and a square at the end
      ongoingTouches.splice(idx, 1); // remove it; we're done
    } else {
      log("can't figure out which touch to end");
    }
  }
}



function handleCancel(evt) {
  evt.preventDefault();
  log("touchcancel.");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
  }
}



