const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    console.log("🟢 User Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("🔴 User Disconnected:", socket.id);
    });

});

server.listen(3000, () => {
    console.log("🚀 PinkSnap Server Running on http://localhost:3000");
});