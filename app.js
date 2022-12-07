const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    color.value =  colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill"
    }else{
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, 800, 800);
    }
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click",onCanvasClick);
//변경시 함수 실행
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

//컬러클릭시  바뀌는 버튼 
colorOptions.forEach(color => color.addEventListener("click",onColorClick));

//
modeBtn.addEventListener("click", onModeClick);