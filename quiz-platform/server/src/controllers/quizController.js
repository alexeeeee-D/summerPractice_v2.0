import * as quizService from "../services/quizService.js";

export async function createQuiz(req, res) {

    try {

        const quiz = await quizService.createQuiz(
            req.body,
            req.user.id
        );

        res.status(201).json(quiz);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}

export async function getQuizzes(req, res) {

    try {

        const quizzes = await quizService.getQuizzes(
            req.user.id
        );

        res.json(quizzes);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}

export async function getQuizById(req, res) {

    try {

        const quiz = await quizService.getQuizById(
            req.params.id,
            req.user.id
        );

        res.json(quiz);

    } catch (error) {

        res.status(404).json({
            error: error.message
        });

    }

}

export async function updateQuiz(req, res) {

    try {

        const quiz = await quizService.updateQuiz(
            req.params.id,
            req.user.id,
            req.body
        );

        res.json(quiz);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}

export async function deleteQuiz(req, res) {

    try {

        const result = await quizService.deleteQuiz(
            req.params.id,
            req.user.id
        );

        res.json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}

