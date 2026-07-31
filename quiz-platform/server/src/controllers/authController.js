import * as authService from "../services/authService.js";

export async function register(req, res) {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            message: "User successfully created",
            user
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}
