import prisma from "../config/prisma.js";

export async function createQuestion(data) {

    const {
        quizId,
        text,
        imageUrl,
        type,
        answerMode,
        points,
        orderNumber,
        options
    } = data;

    if (
        !quizId ||
        !text ||
        !type ||
        !answerMode ||
        !orderNumber ||
        !options ||
        options.length < 2
    ) {
        throw new Error("Invalid question data");
    }

    const question = await prisma.question.create({

        data: {

            quizId: Number(quizId),

            text,

            imageUrl,

            type,

            answerMode,

            points: points ?? 1,

            orderNumber,

            options: {

                create: options.map(option => ({
                    text: option.text,
                    isCorrect: option.isCorrect
                }))

            }

        },

        include: {
            options: true
        }

    });

    return question;

}

export async function getQuestionsByQuiz(quizId) {

    return prisma.question.findMany({

        where: {
            quizId: Number(quizId)
        },

        include: {
            options: true
        },

        orderBy: {
            orderNumber: "asc"
        }

    });

}

export async function getQuestionById(id) {

    return prisma.question.findUnique({

        where: {
            id: Number(id)
        },

        include: {
            options: true
        }

    });

}

export async function deleteQuestion(id) {

    await prisma.question.delete({

        where: {
            id: Number(id)
        }

    });

    return {
        message: "Question deleted"
    };

}

export async function updateQuestion(id, data) {

    const {
        text,
        imageUrl,
        type,
        answerMode,
        points,
        orderNumber,
        options
    } = data;

    return await prisma.$transaction(async (tx) => {

        await tx.answerOption.deleteMany({
            where: {
                questionId: Number(id)
            }
        });

        const question = await tx.question.update({
            where: {
                id: Number(id)
            },
            data: {
                text,
                imageUrl,
                type,
                answerMode,
                points,
                orderNumber,
                options: {
                    create: options.map(option => ({
                        text: option.text,
                        isCorrect: option.isCorrect
                    }))
                }
            },
            include: {
                options: true
            }
        });

        return question;
    });

}
