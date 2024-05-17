import express from "express";
import { create } from "../app/controllers/StudentEnrollment.controller.js";
import { verifyUser } from "../app/middlewares/verifyUser.js";

const router = express.Router();

router.post("/:studentId/", create);

export default router;
