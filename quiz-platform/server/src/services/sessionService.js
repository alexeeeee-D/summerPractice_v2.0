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

export async function joinSession(data, userId) {

    const { roomCode, nickname } = data;

    const session = await prisma.quizSession.findUnique({
        where: {
            roomCode
        }
    });

    if (!session) {
        throw new Error("Room not found");
    }

    if (session.status !== "WAITING") {
        throw new Error("Quiz has already started");
    }

    const alreadyJoined = await prisma.participant.findFirst({
        where: {
            sessionId: session.id,
            userId
        }
    });

    if (alreadyJoined) {
        throw new Error("You have already joined this room");
    }

    return await prisma.participant.create({

        data: {

            nickname,

            userId,

            sessionId: session.id

        },

        include: {
            user: true
        }

    });

}
