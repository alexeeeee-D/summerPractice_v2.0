import prisma from "../config/prisma.js";

export async function createQuiz(data, organizerId) {

    const {
        title,
        description,
        category,
        timeLimit
    } = data;

    if (!title || !category || !timeLimit) {
        throw new Error("Required fields are missing");
    }

    const quiz = await prisma.quiz.create({
        data: {
            title,
            description,
            category,
            timeLimit,
            organizerId
        }
    });

    return quiz;
}

export async function getAllQuizzes(organizerId) {

    return prisma.quiz.findMany({
        where: {
            organizerId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

}

export async function getQuiz(id) {

    return prisma.quiz.findUnique({
        where: {
            id: Number(id)
        }
    });

}

export async function updateQuiz(id, data) {

    return prisma.quiz.update({
        where: {
            id: Number(id)
        },
        data
    });

}

export async function deleteQuiz(id) {

    await prisma.quiz.delete({
        where: {
            id: Number(id)
        }
    });

}
