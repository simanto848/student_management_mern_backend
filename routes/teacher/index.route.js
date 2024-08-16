import express from "express";
import { verifyUser } from "../../app/middlewares/verifyUser.js";
import { getCourses } from "../../app/controllers/Teacher/course.controller.js";

const router = express.Router();

router.get("/course", verifyUser, getCourses);

export default router;
