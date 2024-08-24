import express from "express";
import courseRoutes from "./course.route.js";

const router = express.Router();

router.use("/course", courseRoutes);

export default router;
