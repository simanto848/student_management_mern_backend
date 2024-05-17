import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    currentDue: {
      type: Number,
      required: true,
    },
    paymentFor: {
      type: String,
      enum: [
        "Admission",
        "Tuition Fee",
        "Library Fee",
        "Retake Exam Fee",
        "Improvement Exam Fee",
        "Hostel Fee",
        "Transport Fee",
        "Re-Admission Fee",
        "Other",
      ],
      required: true,
    },
    receipt: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PaymentDetails = mongoose.model("PaymentDetails", paymentDetailsSchema);

export default PaymentDetails;
