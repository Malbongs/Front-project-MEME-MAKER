const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
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
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerHTML = "Fill";
}


//위치잡기
canvas.addEventListener("mousemove", onMove);
//선그리기
canvas.addEventListener("mousedown",startPainting);
//선 그리기 취소
canvas.addEventListener("mouseup",cancelPainting);
//선 그리기 취소(버그)
canvas.addEventListener("mouseleave", cancelPainting);
//canvas 채우기
canvas.addEventListener("click",onCanvasClick);
//변경시 함수 실행
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

//컬러클릭시  바뀌는 버튼 
colorOptions.forEach(color => color.addEventListener("click",onColorClick));

//모드변경
modeBtn.addEventListener("click", onModeClick);
//그림판 초기화
destroyBtn.addEventListener("click",onDestroyClick);
//지우기
eraserBtn.addEventListener("click",onEraserClick);