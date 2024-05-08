import mongoose from "mongoose";

const studentEnrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  semester: {
    // type: enum(1,2,3,4,5,6,7,8,9,10,11,12)
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  totaldue: {
    type: Number,
  },
  waiver: {
    type: Number,
  },
  transactionNumber: {
    type: String,
    required: true,
  },
});
