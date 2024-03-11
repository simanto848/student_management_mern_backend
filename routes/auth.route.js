import express from "express";
import { userLogin, signOut } from "../app/controllers/auth.controller.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/sign-out", signOut);

export default router;
