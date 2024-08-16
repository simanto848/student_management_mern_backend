import express from "express";
import facultyRoutes from "./faculty.route.js";
import departmentRoutes from "./department.route.js";
import teacherRoutes from "./teacher.route.js";
import sessionRoutes from "./session.route.js";
import courseRoutes from "./course.route.js";
import sessionCourseRoutes from "./sessionCourse.route.js";
import studentRoutes from "./student.route.js";
import batchRoutes from "./batch.route.js";
import studentEnrollementRoutes from "./studentEnrollment.route.js";
import paymentRoutes from "./payment.route.js";

const router = express.Router();

router.use("/faculty", facultyRoutes);
router.use("/department", departmentRoutes);
router.use("/teacher", teacherRoutes);
router.use("/session", sessionRoutes);
router.use("/course", courseRoutes);
router.use("/session-courses", sessionCourseRoutes);
router.use("/student", studentRoutes);
router.use("/batch", batchRoutes);
router.use("/student-enrollment", studentEnrollementRoutes);
router.use("/payment-details", paymentRoutes);

export default router;
