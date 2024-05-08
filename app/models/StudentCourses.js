import mongoose from "mongoose";

const studentCourseSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    sessionCourseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SessionCourse",
      required: true,
    },
    attendanceMark: {
      type: Number,
      default: 0,
      required: true,
    },
    presentationMark: {
      type: Number,
      default: 0,
      required: true,
    },
    classTestMark: {
      type: Number,
      default: 0,
      required: true,
    },
    midMark: {
      type: Number,
      default: 0,
      required: true,
    },
    finalMark: {
      type: Number,
      default: 0,
      required: true,
    },
    totalMark: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentCourse = mongoose.model("StudentCourse", studentCourseSchema);

export default StudentCourse;
