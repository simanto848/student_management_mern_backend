import mongoose from "mongoose";

const sessionCourseSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    courseId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const SessionCourse = mongoose.model("SessionCourse", sessionCourseSchema);

export default SessionCourse;
