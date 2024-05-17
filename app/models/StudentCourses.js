import mongoose from "mongoose";

const studentCourseSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    semester: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
    },
    attendanceMark: {
      type: Number,
      default: 0,
      required: true,
    },
    assignmentMark: {
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
  },
  { timestamps: true }
);

const StudentCourse = mongoose.model("StudentCourse", studentCourseSchema);

export default StudentCourse;
