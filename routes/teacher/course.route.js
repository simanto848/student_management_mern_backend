import express from "express";
import { verifyUser } from "../../app/middlewares/verifyUser.js";
import {
  getCourses,
  addCourseTeacher,
  getBatches,
  getBatchStudents,
  storeAttendence,
  getAllAttendenceOfBatch,
} from "../../app/controllers/Teacher/course.controller.js";

const router = express.Router();

router.get("/get-all", verifyUser, getCourses);
router.post("/add", verifyUser, addCourseTeacher);
router.get("/batches", verifyUser, getBatches);
router.get("/batch-students/:batchId", verifyUser, getBatchStudents);
router.post("/attendence/:courseId/:studentId", verifyUser, storeAttendence);
router.get("/attendence/:courseId", verifyUser, getAllAttendenceOfBatch);

export default router;
