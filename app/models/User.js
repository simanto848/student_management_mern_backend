import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "superAdmin",
        "admin",
        "student",
        "teacher",
        "accountant",
        "librarian",
        "receptionist",
        "staff",
        "guard",
        "peon",
      ],
      required: true,
      default: "student",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
