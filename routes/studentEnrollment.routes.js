import express from "express";
import {
  create,
  findOne,
  update,
  remove,
} from "../app/controllers/StudentEnrollment.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/:studentId/", create);
router.get("/:studentId/", findOne);
router.put("/:enrollmentId/", update);
router.delete("/:enrollmentId/", remove);

export default router;
