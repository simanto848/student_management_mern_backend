import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

facultySchema.pre("remove", async function (next) {
  try {
    await mongoose.model("Department").deleteMany({ facultyId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
