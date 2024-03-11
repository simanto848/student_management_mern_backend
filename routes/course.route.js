import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../app/controllers/course.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/create-course", verifyUser, createCourse);
router.get("/", getCourses);
router.get("/:courseId", verifyUser, getCourse);
router.put("/update/:courseId", verifyUser, updateCourse);
router.delete("/delete/:courseId", verifyUser, deleteCourse);

export default router;
