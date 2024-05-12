import express from "express";
import {
  create,
  findAll,
  findOne,
  findBySessionId,
  update,
  remove,
} from "../app/controllers/batch.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, create);
router.get("/", verifyUser, findAll);
router.get("/:batchId", verifyUser, findOne);
router.get("/session/:sessionId", verifyUser, findBySessionId);
router.put("/:batchId", verifyUser, update);
router.delete("/:batchId", verifyUser, remove);

export default router;
