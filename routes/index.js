import express from "express";
import adminRoutes from "./admin/index.route.js";
import authRoutes from "./auth.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
