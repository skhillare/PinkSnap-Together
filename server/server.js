console.log("SERVER STARTING...");

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

    // Create Room
    socket.on("create-room", (room) => {

        socket.join(room);

        console.log("🏠 Room Created:", room);

    });

    // Join Room
    socket.on("join-room", (room) => {

        socket.join(room);

        console.log("❤️ Joined Room:", room);

        socket.to(room).emit("partner-joined");

    });

    socket.on("disconnect", () => {

        console.log("🔴 User Disconnected:", socket.id);

    });

});
app.use(express.static("../"));

server.listen(3000, () => {
    console.log("🚀 PinkSnap Server Running on http://localhost:3000");
});