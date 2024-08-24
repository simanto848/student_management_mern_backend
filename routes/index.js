import express from "express";
import adminRoutes from "./admin/index.route.js";
import authRoutes from "./auth.route.js";
import teacherRoutes from "./teacher/index.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/teacher", teacherRoutes);

export default router;
