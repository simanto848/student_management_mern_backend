import express from "express";
import {
  createSessionCourse,
  getSessionCourseById,
  getSessionByFaculty,
  getSessionCourseByDepartment,
  updateSessionCourse,
} from "../app/controllers/session.course.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, createSessionCourse);
router.get("/:sessionId", verifyUser, getSessionCourseById);
router.get("/:sessionId/faculty/:facultyId", verifyUser, getSessionByFaculty);
router.get(
  "/:sessionId/department/:departmentId",
  verifyUser,
  getSessionCourseByDepartment
);
router.put("/:sessionCourseId", verifyUser, updateSessionCourse);

export default router;
