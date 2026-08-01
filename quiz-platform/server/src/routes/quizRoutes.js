import { Router } from "express";

import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

import {
    createQuiz,
    getQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz
} from "../controllers/quizController.js";

const router = Router();

router.use(auth);
router.use(role("ORGANIZER"));

router.post("/", createQuiz);

router.get("/", getQuizzes);

router.get("/:id", getQuizById);

router.put("/:id", updateQuiz);

router.delete("/:id", deleteQuiz);

export default router;
