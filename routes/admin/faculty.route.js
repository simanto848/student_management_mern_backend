import express from "express";
import {
  createFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty,
  getFaculty,
} from "../../app/controllers/admin/faculty.controller.js";
import { verifyUser } from "../../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createFaculty);
router.get("/", verifyUser, getFaculties);
router.get("/:facultyId", verifyUser, getFaculty);
router.put("/update/:facultyId", verifyUser, updateFaculty);
router.delete("/delete/:facultyId", verifyUser, deleteFaculty);

export default router;
