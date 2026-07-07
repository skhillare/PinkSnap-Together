const startBtn = document.getElementById("startCamera");
const captureBtn = document.getElementById("captureBtn");

const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");

const gallery = document.getElementById("gallery");

const countdown = document.getElementById("countdown");

const flash = document.getElementById("flash");

let stream;

startBtn.addEventListener("click", async ()=>{

stream = await navigator.mediaDevices.getUserMedia({
video:true
});

video.srcObject = stream;

});

captureBtn.addEventListener("click", startCountdown);

function startCountdown(){

let count=3;

countdown.innerHTML=count;

const timer=setInterval(()=>{

count--;

if(count>0){

countdown.innerHTML=count;

}else{

clearInterval(timer);

countdown.innerHTML="";

capturePhoto();

}

},1000);

}

function capturePhoto(){

flash.classList.add("show");

setTimeout(()=>{

flash.classList.remove("show");

},150);

canvas.width=video.videoWidth;

canvas.height=video.videoHeight;

const ctx=canvas.getContext("2d");

ctx.drawImage(video,0,0);

const img=document.createElement("img");

img.src=canvas.toDataURL("image/png");

img.style.width="250px";

img.style.borderRadius="20px";

img.style.margin="15px";

gallery.appendChild(img);

}
const coupleBtn = document.getElementById("coupleBtn");

const modal = document.getElementById("roomModal");

const closeModal = document.getElementById("closeModal");

coupleBtn.onclick = () => {

modal.style.display = "flex";

}

closeModal.onclick = () => {

modal.style.display = "none";

}

window.onclick = (e)=>{

if(e.target===modal){

modal.style.display="none";

}

}