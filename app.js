const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
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
ctx.lineCap = "round";
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
        modeBtn.innerText = "🎨 색 채우기"
    }else{
        isFilling = true;
        modeBtn.innerText = "✏️ 선 그리기"
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
    modeBtn.innerHTML = "🎨 색 채우기";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image()
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "68px serif"
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore();
    }

}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

//text넣기
canvas.addEventListener("dblclick", onDubleClick);
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
//file 업로드
fileInput.addEventListener("change",onFileChange);
//이미지 저장
saveBtn.addEventListener("click",onSaveClick);