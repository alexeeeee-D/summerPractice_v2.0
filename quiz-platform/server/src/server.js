import dotenv from "dotenv";
import app from "./app.js";
import prisma from "./config/prisma.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await prisma.$connect();
        console.log("✅ PostgreSQL connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server started on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to connect to PostgreSQL");
        console.error(error);
        process.exit(1);
    }
}

startServer();