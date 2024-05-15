import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    creditHours: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    maintainable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

courseSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("SessionCourse").deleteMany({ courseId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
