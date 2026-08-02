import { getIO } from "../config/socket.js";

const io = getIO();

io.on("connection", (socket) => {

    socket.on("join-room", ({ roomCode, username }) => {

        socket.join(roomCode);

        console.log(`${username} joined room ${roomCode}`);

        io.to(roomCode).emit("user-joined", {
            username
        });

    });

});
