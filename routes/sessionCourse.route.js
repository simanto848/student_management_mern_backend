import express from "express";
import {
  createSessionCourse,
  getSessionCourses,
  getSessionCourse,
  getSessionCourseByDepartment,
} from "../app/controllers/session.course.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, createSessionCourse);
router.get("/", getSessionCourses);
router.get("/:sessionId", verifyUser, getSessionCourse);
router.get(
  "/department/:departmentId",
  verifyUser,
  getSessionCourseByDepartment
);

export default router;
