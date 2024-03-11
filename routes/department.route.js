import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartment,
  getDepartmentsByFaculty,
  updateDepartment,
  deleteDepartment,
} from "../app/controllers/department.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createDepartment);
router.get("/", verifyUser, getDepartments);
router.get("/:departmentId", verifyUser, getDepartment);
router.get("/faculty/:facultyId", verifyUser, getDepartmentsByFaculty);
router.put("/update/:departmentId", verifyUser, updateDepartment);
router.delete("/delete/:departmentId", verifyUser, deleteDepartment);

export default router;
