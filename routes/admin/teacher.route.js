import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../app/controllers/admin/teacher.controller.js";
import { verifyUser } from "../../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createTeacher);
router.get("/", getAllTeachers);
router.get("/:teacherId", verifyUser, getTeacher);
router.put("/update/:teacherId", verifyUser, updateTeacher);
router.delete("/delete/:teacherId", verifyUser, deleteTeacher);

export default router;
