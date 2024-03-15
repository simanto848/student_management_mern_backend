import SessionCourse from "../models/SessionCourse.js";
import Session from "../models/Session.js";
import Course from "../models/Course.js";

export const createSessionCourse = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { sessionId, courseIds, departmentId } = req.body;
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      } else {
        const courses = await Course.find({ _id: { $in: courseIds } });
        if (courses.length !== courseIds.length) {
          return res.status(404).json({ message: "Course not found" });
        } else {
          const sessionCourses = courseIds.map((courseId) => ({
            sessionId,
            courseId,
            departmentId,
          }));
          await SessionCourse.insertMany(sessionCourses);
          return res.status(201).json({ message: "Session course created" });
        }
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCourses = async (req, res) => {
  try {
    const sessionCourses = await SessionCourse.find();
    return res.status(200).json(sessionCourses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCourse = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionCourses = await SessionCourse.find({ sessionId });
    if (sessionCourses.length === 0) {
      return res.status(404).json({ message: "Session course not found" });
    } else {
      return res.status(200).json(sessionCourses);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCourseByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const sessionCourses = await SessionCourse.find({ departmentId });
    if (sessionCourses.length === 0) {
      return res.status(404).json({ message: "Session course not found" });
    } else {
      return res.status(200).json(sessionCourses);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
