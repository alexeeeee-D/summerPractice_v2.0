import * as questionService from "../services/questionService.js";

export async function createQuestion(req, res) {

    try {

        const question = await questionService.createQuestion(req.body);

        res.status(201).json(question);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}

export async function getQuestions(req, res) {

    try {

        const questions =
            await questionService.getQuestionsByQuiz(
                req.params.quizId
            );

        res.json(questions);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}

export async function getQuestion(req, res) {

    try {

        const question =
            await questionService.getQuestionById(
                req.params.id
            );

        res.json(question);

    } catch (error) {

        res.status(404).json({
            error: error.message
        });

    }

}

export async function deleteQuestion(req, res) {

    try {

        const result =
            await questionService.deleteQuestion(
                req.params.id
            );

        res.json(result);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}