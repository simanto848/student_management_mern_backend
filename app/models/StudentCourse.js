import mongoose from "mongoose";

const StudentCourseSchema = mongoose.Schema(
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
  },
  { timestamps: true }
);

const StudentCourse = mongoose.model("StudentCourse", StudentCourseSchema);

export default StudentCourse;
