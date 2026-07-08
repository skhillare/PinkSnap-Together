// ============================
// PinkSnap Together
// app.js - Part 1
// ============================

// Elements

const camera = document.getElementById("liveCamera");
const startCamera = document.getElementById("startCamera");

const themeBtn = document.getElementById("themeBtn");

const soloBtn = document.getElementById("soloBtn");
const coupleBtn = document.getElementById("coupleBtn");

const roomModal = document.getElementById("roomModal");
const closeModal = document.getElementById("closeModal");

const mirrorBtn = document.getElementById("mirror");
const fullscreenBtn = document.getElementById("fullscreen");

// Camera Stream

let stream = null;

async function startWebcam() {

    try {

        stream = await navigator.mediaDevices.getUserMedia({

            video: true,
            audio: false

        });

        camera.srcObject = stream;

    }

    catch (err) {

        alert("Camera Permission Denied!");

        console.log(err);

    }

}

startCamera.addEventListener("click", startWebcam);

// ============================
// Theme
// ============================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML = "☀️";

    }else{

        themeBtn.innerHTML="🌙";

    }

});

// ============================
// Couple Modal
// ============================

coupleBtn.addEventListener("click",()=>{

    roomModal.style.display="flex";

});

closeModal.addEventListener("click",()=>{

    roomModal.style.display="none";

});

window.onclick=(e)=>{

    if(e.target==roomModal){

        roomModal.style.display="none";

    }

}

// ============================
// Mirror Camera
// ============================

let mirror=false;

mirrorBtn.addEventListener("click",()=>{

    mirror=!mirror;

    if(mirror){

        camera.style.transform="scaleX(-1)";

    }

    else{

        camera.style.transform="scaleX(1)";

    }

});

// ============================
// Fullscreen
// ============================

fullscreenBtn.addEventListener("click",()=>{

    if(camera.requestFullscreen){

        camera.requestFullscreen();

    }

});
// ============================
// Capture Photo
// ============================

const captureBtn = document.getElementById("capture");
const downloadBtn = document.getElementById("download");

const flash = document.getElementById("flash");
const countdown = document.getElementById("countdown");

const gallery = document.getElementById("galleryGrid");

const canvas = document.createElement("canvas");
const stripCanvas = document.createElement("canvas");
const stripCtx = stripCanvas.getContext("2d");
let photoCount = 2;
let capturedPhotos = [];

// Countdown

async function startCountdown(){

    countdown.style.display="flex";

    for(let i=3;i>=1;i--){

        countdown.innerHTML=i;

        await new Promise(resolve=>setTimeout(resolve,1000));

    }

    countdown.innerHTML="📸";

    await new Promise(resolve=>setTimeout(resolve,500));

    countdown.style.display="none";

}

// Flash

function flashEffect(){

    flash.style.opacity="1";

    flash.style.transition=".2s";

    setTimeout(()=>{

        flash.style.opacity="0";

    },200);

}

// ============================
// Capture
// ============================

captureBtn.addEventListener("click", async () => {

    if (capturedPhotos.length >= photoCount) {
        alert("Photo Strip Complete!");
        return;
    }

    if (!stream) {
        alert("Please Start Camera First");
        return;
    }

    await startCountdown();

    flashEffect();

    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;

    const ctx = canvas.getContext("2d");

    if (mirror) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
    }

    ctx.drawImage(camera, 0, 0);

    const image = canvas.toDataURL("image/png");

    capturedPhotos.push(image);

    const img = document.createElement("img");
    img.src = image;

    gallery.appendChild(img);

});

downloadBtn.addEventListener("click", async () => {

    const strip = await createPhotoStrip();

    if (!strip) {
        alert("Capture photos first!");
        return;
    }

    const a = document.createElement("a");

    a.href = strip;
    a.download = "PinkSnapStrip.png";

    a.click();

});
// ============================
// Retake
// ============================

const retakeBtn = document.getElementById("retake");

retakeBtn.addEventListener("click", () => {

    capturedPhotos = [];

    gallery.innerHTML = `
        <div class="emptyGallery">
            <h3>No Photos Yet</h3>
            <p>Your captured photos will appear here.</p>
        </div>
    `;

});
// ============================
// Couple Room UI
// ============================

const createRoomBtn = document.getElementById("createRoom");
const joinRoomBtn = document.getElementById("joinRoom");
const roomInput = document.getElementById("roomInput");

// Generate Random Room Code

function generateRoomCode(){

    const chars="ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

    let code="";

    for(let i=0;i<6;i++){

        code+=chars.charAt(
            Math.floor(Math.random()*chars.length)
        );

    }

    return code;

}

// Create Room

createRoomBtn.addEventListener("click",()=>{

    const roomCode=generateRoomCode();

    roomInput.value=roomCode;

    navigator.clipboard.writeText(roomCode);

    alert(
        "🎉 Room Created!\n\nRoom Code : "
        +roomCode+
        "\n\nCode Copied Successfully."
    );

});

// Join Room

joinRoomBtn.addEventListener("click",()=>{

    const code=roomInput.value.trim();

    if(code===""){

        alert("Please Enter Room Code");

        return;

    }

    alert("Joining Room : "+code);

    roomModal.style.display="none";

});

// ============================
// ESC Close Modal
// ============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        roomModal.style.display="none";

    }

});

// ============================
// Welcome Animation
// ============================

window.addEventListener("load",()=>{

    document.body.style.opacity="0";

    document.body.style.transition="opacity .8s";

    setTimeout(()=>{

        document.body.style.opacity="1";

    },100);

});

// ============================
// Future Features
// ============================

// Socket.IO
// WebRTC
// Live Chat
// Shared Camera
// Shared Countdown
// Shared Capture
// Shared Photo Strip
// ===========================
// Photo Strip Layout
// ===========================

const stripButtons = document.querySelectorAll(".stripBtn");
const stripInfo = document.getElementById("stripInfo");

stripButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        stripButtons.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        photoCount = Number(btn.dataset.count);

        stripInfo.innerHTML =
        `Current Layout : <strong>${photoCount} Photos</strong>`;

    });

});
async function createPhotoStrip() {

    if (capturedPhotos.length === 0) return;

    const width = 500;
    const photoHeight = 350;

    stripCanvas.width = width;
    stripCanvas.height = (photoHeight * capturedPhotos.length) + 100;

    stripCtx.fillStyle = "#ffffff";
    stripCtx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);
    // White Border
stripCtx.strokeStyle = "#ff4fa0";
stripCtx.lineWidth = 8;
stripCtx.strokeRect(4, 4, stripCanvas.width - 8, stripCanvas.height - 8);

    for (let i = 0; i < capturedPhotos.length; i++) {

        const img = new Image();

        await new Promise(resolve => {

            img.onload = () => {

               const x = 20;
const y = 20 + (i * photoHeight);
const w = width - 40;
const h = photoHeight - 20;

stripCtx.fillStyle = "#ffffff";
stripCtx.fillRect(x - 5, y - 5, w + 10, h + 10);

stripCtx.drawImage(img, x, y, w, h);

                resolve();

            };

            img.src = capturedPhotos[i];

        });

    }

    stripCtx.fillStyle = "#ff4fa0";
    stripCtx.font = "bold 28px Arial";
    stripCtx.textAlign = "center";

    stripCtx.fillText(
        "PinkSnap ❤️",
        width / 2,
        stripCanvas.height - 30
    );

    return stripCanvas.toDataURL("image/png");

}
console.log("END OF APP.JS");