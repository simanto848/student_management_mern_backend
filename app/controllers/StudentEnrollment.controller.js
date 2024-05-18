import StudentEnrollment from "../models/StudentEnrollment.js";
import Student from "../models/Student.js";
import Batch from "../models/Batch.js";
import SessionCourse from "../models/SessionCourse.js";
import StudentCourses from "../models/StudentCourses.js";
import PaymentDetails from "../models/paymentDetails.js";
import generateRandomString from "../helpers/StringGenerator.js";

// Create and Save a new Enrollment
export const create = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { semester, paidAmount, paymentFor } = req.body;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action!." });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    const { courseFee, scholarship } = student;
    const netCourseFee = courseFee - scholarship;

    const paymentDetails = new PaymentDetails({
      studentId: studentId,
      paymentAmount: paidAmount,
      currentDue: 0,
      paymentFor: paymentFor,
      receipt:
        "TRX" + generateRandomString(8) + new Date().getTime().toString(),
    });

    // Check if the payment is for a future semester
    const existingEnrollment = await StudentEnrollment.findOne({
      studentId: studentId,
      semester: semester,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Payment for this semester already exists!",
      });
    }

    // If the payment is not for "Tuition Fee", record it directly
    if (paymentFor !== "Tuition Fee") {
      await paymentDetails.save();
      return res
        .status(201)
        .json({ message: "Payment recorded successfully!" });
    }

    // Calculate total paid amount for tuition fees
    const tuitionPayments = await PaymentDetails.find({
      studentId: studentId,
      paymentFor: "Tuition Fee",
    });

    const totalPaidAmount =
      tuitionPayments.reduce((sum, payment) => sum + payment.paymentAmount, 0) +
      paidAmount;
    const currentDue = netCourseFee - totalPaidAmount;

    const batchId = student.batchId;
    const departmentId = student.departmentId;
    const batch = await Batch.findOne({
      _id: batchId,
      departmentId: departmentId,
    });
    const sessionId = batch.sessionId;

    const sessionCourses = await SessionCourse.aggregate([
      { $match: { sessionId: sessionId, departmentId: departmentId } },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      { $match: { "course.semester": Number(semester) } },
      { $project: { courseId: "$course._id" } },
    ]);

    if (sessionCourses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this session!" });
    }

    const filteredCourseIds = sessionCourses.map(
      (sessionCourse) => sessionCourse.courseId
    );

    const transactionNumber =
      "TRX" + generateRandomString(8) + new Date().getTime().toString();

    const enrollment = new StudentEnrollment({
      studentId: studentId,
      semester: semester,
      paidAmount: totalPaidAmount,
      currentDue: currentDue,
      transactionNumber: transactionNumber,
    });

    await enrollment.save();

    paymentDetails.currentDue = currentDue;
    await paymentDetails.save();

    if (currentDue <= 0 || totalPaidAmount >= (semester * netCourseFee) / 8) {
      for (const courseId of filteredCourseIds) {
        const studentCourse = new StudentCourses({
          studentId: studentId,
          courseId: courseId,
          semester: semester,
        });
        await studentCourse.save();
      }

      return res.status(201).json({
        message: "Enrollment and payment successful!",
        filteredCourseIds,
      });
    } else {
      return res.status(200).json({
        message:
          "Partial payment received. Remaining balance must be paid before enrollment.",
        currentDue,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
