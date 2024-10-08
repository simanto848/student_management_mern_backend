import express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  remove,
  getStudentByKeyword,
  getStudentsByBatch,
} from "../../app/controllers/admin/student.controller.js";
import { verifyUser } from "../../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, create);
router.get("/", verifyUser, findAll);
router.get("/search", verifyUser, getStudentByKeyword);
router.get("/batch/:batchId/students", getStudentsByBatch);
router.get("/:studentId", verifyUser, findOne);
router.put("/:studentId", verifyUser, update);
router.delete("/:studentId", verifyUser, remove);

export default router;
