import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  getCourseByDepartment,
  updateCourse,
  deleteCourse,
} from "../app/controllers/course.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/create-course", verifyUser, createCourse);
router.get("/", getCourses);
router.get("/:courseId", verifyUser, getCourse);
router.get("/department/:departmentId", verifyUser, getCourseByDepartment);
router.put("/update/:courseId", verifyUser, updateCourse);
router.delete("/delete/:courseId", verifyUser, deleteCourse);

export default router;
