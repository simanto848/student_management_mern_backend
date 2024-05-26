import express from "express";
import {
  createPayment,
  getPaymentsByStudentId,
  updatePayment,
  deletePayment,
} from "../app/controllers/payment.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/:studentId", verifyUser, createPayment);
router.get("/:studentId", verifyUser, getPaymentsByStudentId);
router.put("/:paymentId", verifyUser, updatePayment);
router.delete("/:paymentId", verifyUser, deletePayment);

export default router;
