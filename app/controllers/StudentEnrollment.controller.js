import StudentEnrollment from "../models/StudentEnrollment.js";
import Student from "../models/Student.js";
import Batch from "../models/Batch.js";
import SessionCourse from "../models/SessionCourse.js";
import StudentCourses from "../models/StudentCourses.js";
import generateRandomString from "../helpers/StringGenerator.js";

// Create and Save a new Enrollment
export const create = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { semester, semesterFee, waiver, paidAmount } = req.body;
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action!." });
    } else {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found!" });
      }
      const batchId = student.batchId;
      const departmentId = student.departmentId;
      const batch = await Batch.findOne({
        _id: batchId,
        departmentId: departmentId,
      });
      const sessionId = batch.sessionId;

      const sessionCourses = await SessionCourse.aggregate([
        {
          $match: {
            sessionId: sessionId,
            departmentId: departmentId,
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $match: {
            "course.semester": Number(semester),
          },
        },
        {
          $project: {
            courseId: "$course._id",
          },
        },
      ]);

      if (
        sessionCourses.length === 0 ||
        !sessionCourses ||
        sessionCourses === undefined
      ) {
        return res
          .status(404)
          .json({ message: "No courses found for this session!" });
      } else {
        const filteredCourseIds = sessionCourses.map(
          (sessionCourse) => sessionCourse.courseId
        );

        const isStudentEnrolled = await StudentEnrollment.findOne({
          studentId: studentId,
        });

        if (
          isStudentEnrolled === null ||
          isStudentEnrolled === undefined ||
          isStudentEnrolled === "" ||
          isStudentEnrolled === false ||
          isStudentEnrolled.length === 0
        ) {
          const transactionNumber =
            "TRX" + generateRandomString(8) + new Date().getTime().toString();

          const enrollment = new StudentEnrollment({
            studentId: studentId,
            semester: semester,
            semesterFee: student.courseFee / 8,
            waiver: waiver,
            transactionNumber: transactionNumber,
          });

          await enrollment.save();
          return res.status(201).json({ filteredCourseIds });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
