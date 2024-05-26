import PaymentDetails from "../models/paymentDetails.js";

export async function createPayment(studentId, paymentData) {
  const payment = new PaymentDetails({
    ...paymentData,
    studentId,
  });
  await payment.save();
  return payment;
}

export async function getPaymentsByKeyword(keyword, value) {
  return await PaymentDetails.find({ [keyword]: value });
}

export async function updatePayment(paymentId, paymentData) {
  return await PaymentDetails.findByIdAndUpdate(paymentId, paymentData);
}

export async function deletePayment(paymentId) {
  await PaymentDetails.findByIdAndRemove(paymentId);
}
