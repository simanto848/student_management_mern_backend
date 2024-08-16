import SessionCourse from "../../models/SessionCourse.js";
import Teacher from "../../models/Teacher.js";
import Batch from "../../models/Batch.js";
import Student from "../../models/Student.js";
import Attendence from "../../models/Attendence.js";

// Get all courses of a teacher
export const getCourses = async (req, res) => {
  if (req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).send({ message: "Permission denied" });
  } else {
    try {
      const teacherId = req.user.id;
      const sessionCourseDetails = await SessionCourse.find({
        teacherId: teacherId,
      });
      console.log(sessionCourseDetails);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Add a course to a teacher
export const addCourseTeacher = async (req, res) => {
  if (
    req.user.role.toLowerCase() !== "teacher" &&
    req.user.role.toLowerCase() !== "admin"
  ) {
    return res.status(403).send({ message: "Permission denied" });
  } else {
    try {
      const teacherId = req.user.id;
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).send({ message: "Teacher not found" });
      } else {
        const course = new SessionCourse({
          // course details
        });
        await course.save();
        return res.status(201).json(course);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Get all batches of a course
export const getBatches = async (req, res) => {
  if (req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).send({ message: "Permission denied" });
  } else {
    try {
      const sessionCourseDetails = await SessionCourse.find({
        teacherId: req.user.id,
      });
      if (!sessionCourseDetails || sessionCourseDetails.length === 0) {
        return res.status(404).send({ message: "Course not found" });
      } else {
        const sessionId = sessionCourseDetails[0].sessionId;
        const batches = await Batch.find({ sessionId: sessionId });

        if (!batches || batches.length === 0) {
          return res.status(404).send({ message: "No batches found" });
        } else {
          return res.status(200).json(batches);
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Get batch students
export const getBatchStudents = async (req, res) => {
  if (req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).send({ message: "Permission denied" });
  } else {
    try {
      const batchId = req.params.batchId;
      const batch = await Batch.findById(batchId);

      if (!batch || batch.length === 0) {
        return res.status(404).send({ message: "Batch not found" });
      } else {
        const batchStudents = await Student.find({ batchId: batchId });

        if (!batchStudents || batchStudents.length === 0) {
          return res.status(404).send({ message: "No students found" });
        } else {
          return res.status(200).json(batchStudents);
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Store attendence
export const storeAttendence = async (req, res) => {
  if (req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).send({ message: "Permission denied" });
  } else {
    try {
      const courseId = req.params.courseId;
      const studentId = req.params.studentId;

      const attendence = new Attendence({
        present: req.body.present,
        courseId: courseId,
        studentId: studentId,
      });

      await attendence.save();
      return res.status(201).json(attendence);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Get attendence
export const getAllAttendenceOfBatch = async (req, res) => {
  if (req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).send({ message: "Permission denied" });
  } else {
    try {
      const courseId = req.params.courseId;

      const attendence = await Attendence.find({ courseId: courseId });

      if (!attendence || attendence.length === 0) {
        return res.status(404).send({ message: "No attendence found" });
      } else {
        return res.status(200).json(attendence);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
