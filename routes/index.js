import express from "express";
import { userRegister } from "../app/controllers/auth.controller.js";

const router = express.Router();

router.post("/login", userRegister);

export default router;
