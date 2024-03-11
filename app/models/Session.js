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

const Session = mongoose.model("Session", sessionSchema);

export default Session;
