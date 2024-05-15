import mongoose from "mongoose";

const studentEnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    semester: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
    },
    totalPaid: {
      type: Number,
      required: true,
    },
    totaldue: {
      type: Number,
    },
    semesterFee: {
      type: Number,
      required: true,
    },
    waiver: {
      type: Number,
    },
    transactionNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentEnrollment = mongoose.model(
  "StudentEnrollment",
  studentEnrollmentSchema
);

export default StudentEnrollment;
