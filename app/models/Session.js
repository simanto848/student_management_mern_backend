import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

sessionSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("SessionCourse").deleteMany({ sessionId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
