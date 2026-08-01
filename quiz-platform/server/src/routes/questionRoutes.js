import { Router } from "express";

import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

import {

    createQuestion,

    getQuestions,

    getQuestion,

    updateQuestion,

    deleteQuestion

} from "../controllers/questionController.js";

const router = Router();

router.use(auth);

router.use(role("ORGANIZER"));

router.post("/", createQuestion);

router.get("/quiz/:quizId", getQuestions);

router.get("/:id", getQuestion);

router.put("/:id", updateQuestion);

router.delete("/:id", deleteQuestion);

export default router;