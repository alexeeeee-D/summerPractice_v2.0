import * as sessionService from "../services/sessionService.js";

export async function createSession(req, res) {

    try {

        const session =
            await sessionService.createSession(
                req.body.quizId
            );

        res.status(201).json(session);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}

export async function joinSession(req, res) {

    try {

        const participant =
            await sessionService.joinSession(
                req.body,
                req.user.id
            );

        res.status(201).json(participant);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

}
