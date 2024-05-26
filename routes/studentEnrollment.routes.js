import express from "express";
import {
  create,
  findOne,
  update,
  remove,
  getPaymentHistoryByStudentId,
} from "../app/controllers/StudentEnrollment.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/:studentId", verifyUser, create);
router.get("/:studentId", findOne);
router.put("/:enrollmentId/", verifyUser, update);
router.delete("/:enrollmentId/", verifyUser, remove);
router.get(
  "/payment-history/:studentId",
  verifyUser,
  getPaymentHistoryByStudentId
);

export default router;
