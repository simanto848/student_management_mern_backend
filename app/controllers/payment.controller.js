import * as PaymentService from "../services/payment.service.js";

export const createPayment = async (req, res) => {
  const { studentId } = req.params;
  try {
    if (req.user.role !== "admin" && req.user.role !== "student")
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    const payment = await PaymentService.createPayment(studentId, req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPaymentsByStudentId = async (req, res) => {
  const { studentId } = req.params;
  try {
    const payments = await PaymentService.getPaymentsByKeyword(
      "studentId",
      studentId
    );
    res.status(200).json(payments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const updatedPayment = await PaymentService.updatePayment(
      paymentId,
      req.body
    );
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    await PaymentService.deletePayment(paymentId);
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
