import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import dbConfig from "./config/dbConfig.js";

// Import the routes
import authRoutes from "./routes/auth.route.js";
import facultyRoutes from "./routes/faculty.route.js";
import departmentRoutes from "./routes/department.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import sessionRoutes from "./routes/session.route.js";
import courseRoutes from "./routes/course.route.js";
import sessionCourseRoutes from "./routes/sessionCourse.route.js";
import studentRoutes from "./routes/student.route.js";

// Call the config function from the dotenv package
config();

dbConfig();

const app = express();

// Define the PORT
const PORT = process.env.PORT || 5000;

// Define the middleware
app.use(express.json());
app.use(cookieParser());

// Define the routes
app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/session-courses", sessionCourseRoutes);
app.use("/api/student", studentRoutes);

// Create a express server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON: http://localhost:${PORT}`);
});
