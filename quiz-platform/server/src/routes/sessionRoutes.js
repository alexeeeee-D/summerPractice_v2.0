import { Router } from "express";

import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

import {
    createSession,
    joinSession
} from "../controllers/sessionController.js";

const router = Router();

router.use(auth);

router.use(role("ORGANIZER"));

router.post("/", createSession);

router.post("/join", joinSession);

export default router;
