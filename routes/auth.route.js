import express from "express";
import {
  userLogin,
  teacherLogin,
  signOut,
} from "../app/controllers/auth.controller.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/teacher-login", teacherLogin);
router.get("/sign-out", signOut);

export default router;
