import SessionCourse from "../../models/SessionCourse.js";
import Session from "../../models/Session.js";
import Department from "../../models/Department.js";

export const createSessionCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { sessionId, courseIds, departmentId } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const existingSessionCourses = await SessionCourse.find({
      sessionId,
      departmentId,
    });

    const existingCourseIds = existingSessionCourses.map((course) =>
      course.courseId.toString()
    );

    const courseIdsToDelete = existingCourseIds.filter(
      (courseId) => !courseIds.includes(courseId)
    );
    const courseIdsToInsert = courseIds.filter(
      (courseId) => !existingCourseIds.includes(courseId)
    );

    if (courseIdsToDelete.length > 0) {
      await SessionCourse.deleteMany({
        sessionId,
        departmentId,
        courseId: { $in: courseIdsToDelete },
      });
    }

    if (courseIdsToInsert.length > 0) {
      const newSessionCourses = courseIdsToInsert.map((courseId) => ({
        sessionId,
        courseId,
        departmentId,
      }));
      await SessionCourse.insertMany(newSessionCourses);
    }

    return res
      .status(201)
      .json({ message: "Session courses created/updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCourseById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (!sessionId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const sessionCourses = await SessionCourse.find({ sessionId }).populate(
      "sessionId courseId departmentId"
    );
    if (sessionCourses.length === 0) {
      return res.status(404).json({ message: "Session course not found" });
    }
    return res.status(200).json(sessionCourses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionByFaculty = async (req, res) => {
  try {
    const { sessionId, facultyId } = req.params;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (!sessionId || !facultyId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const sessionCourses = await SessionCourse.find({ sessionId, facultyId });
    if (sessionCourses.length === 0) {
      return res.status(200).json({ message: "Session course not found" });
    }
    return res.status(200).json(sessionCourses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionCourseByDepartment = async (req, res) => {
  try {
    const { sessionId, departmentId } = req.params;
    if (!sessionId || !departmentId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const sessionCourses = await SessionCourse.find({
      sessionId,
      departmentId,
    });
    if (sessionCourses.length === 0) {
      return res.status(404).json({ message: "Session course not found" });
    }
    return res.status(200).json(sessionCourses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateSessionCourse = async (req, res) => {
  try {
    const { sessionCourseId } = req.params;
    const { teacherId } = req.body;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (!sessionCourseId || !teacherId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const sessionCourse = await SessionCourse.findById(sessionCourseId);
    if (!sessionCourse) {
      return res.status(404).json({ message: "Session course not found" });
    }
    sessionCourse.teacherId = teacherId;
    await sessionCourse.save();
    return res
      .status(200)
      .json({ message: "Session course teacher updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
