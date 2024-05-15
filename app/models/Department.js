import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    shortName: {
      type: String,
      required: true,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
  },
  { timestamps: true }
);

departmentSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("Course").deleteMany({ departmentId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
