import prisma from "../config/prisma.js";

export async function createQuiz(data, authorId) {
    const {
        title,
        description,
        categoryId,
        coverImage,
        timePerQuestion
    } = data;

    if (!title || !categoryId || !timePerQuestion) {
        throw new Error("Required fields are missing");
    }

    return await prisma.quiz.create({
        data: {
            title,
            description,
            coverImage,
            timePerQuestion: Number(timePerQuestion),
            categoryId: Number(categoryId),
            authorId
        },
        include: {
            category: true
        }
    });
}

export async function getQuizzes(authorId) {
    return await prisma.quiz.findMany({
        where: {
            authorId
        },
        include: {
            category: true,
            questions: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export async function getQuizById(id) {
    const quiz = await prisma.quiz.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            category: true,
            questions: {
                include: {
                    options: true
                }
            }
        }
    });

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    return quiz;
}

export async function updateQuiz(id, data) {

    return await prisma.quiz.update({
        where: {
            id: Number(id)
        },
        data: {
            ...data,
            categoryId: data.categoryId
                ? Number(data.categoryId)
                : undefined,
            timePerQuestion: data.timePerQuestion
                ? Number(data.timePerQuestion)
                : undefined
        }
    });

}

export async function deleteQuiz(id) {

    await prisma.quiz.delete({
        where: {
            id: Number(id)
        }
    });

    return {
        message: "Quiz deleted"
    };
}