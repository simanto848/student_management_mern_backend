import mongoose from "mongoose";

const AttendenceSchema = mongoose.Schema(
  {
    present: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

const Attendence = mongoose.model("Attendence", AttendenceSchema);

export default Attendence;
