import dotenv from "dotenv";
import http from "http";

import app from "./app.js";
import prisma from "./config/prisma.js";
import { initSocket } from "./config/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

import("./sockets/index.js");

async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log("✅ PostgreSQL connected");
    } catch (error) {
        console.error(error);
    }
}

connectDatabase();

server.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});