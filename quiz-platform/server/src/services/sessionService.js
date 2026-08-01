import prisma from "../config/prisma.js";
import generateRoomCode from "../utils/generateRoomCode.js";

export async function createSession(quizId) {

    const quiz = await prisma.quiz.findUnique({
        where: {
            id: Number(quizId)
        }
    });

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    let roomCode;

    while (true) {

        roomCode = generateRoomCode();

        const exists = await prisma.quizSession.findUnique({
            where: {
                roomCode
            }
        });

        if (!exists) break;

    }

    return await prisma.quizSession.create({

        data: {

            roomCode,

            quizId: Number(quizId),

            status: "WAITING"

        }

    });

}
