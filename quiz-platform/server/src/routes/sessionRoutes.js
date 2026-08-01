import { Router } from "express";

import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

import {
    createSession
} from "../controllers/sessionController.js";

const router = Router();

router.use(auth);

router.use(role("ORGANIZER"));

router.post("/", createSession);

export default router;
