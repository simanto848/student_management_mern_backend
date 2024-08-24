import express from "express";
import {
  createSession,
  getAllSession,
  getSessionById,
  getSessionByName,
  getSessionBatches,
  updateSession,
  deleteSession,
} from "../../app/controllers/admin/session.controller.js";
import { verifyUser } from "../../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/create-session", verifyUser, createSession);
router.get("/", getAllSession);
router.get("/:sessionId", verifyUser, getSessionById);
router.get("/get-by-name", verifyUser, getSessionByName);
router.get("/batches/:sessionId", verifyUser, getSessionBatches);
router.put("/update/:sessionId", verifyUser, updateSession);
router.delete("/delete/:sessionId", verifyUser, deleteSession);

export default router;
