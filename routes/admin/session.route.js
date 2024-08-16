import express from "express";
import {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
} from "../../app/controllers/admin/session.controller.js";
import { verifyUser } from "../../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/create-session", verifyUser, createSession);
router.get("/", getSessions);
router.get("/:sessionId", verifyUser, getSession);
router.put("/update/:sessionId", verifyUser, updateSession);
router.delete("/delete/:sessionId", verifyUser, deleteSession);

export default router;
