const Payment = require("../models/payment");

const addPayment = async (req, res, next) => {
  try {
    const { student_id, course_id, contract_id, amount } = req.body;
    const newPayment = await Payment.create({
      student_id,
      course_id,
      contract_id,
      amount,
    });
    await newPayment.save();
    res.status(201).send({
      message: "new payment added",
      data: newPayment,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll();
    res.status(201).send({
      message: "All payments",
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    res.status(200).send({
      message: `Payment number ${id}`,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const updatePaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(payment);
    res.status(200).send({
      message: "payment updated",
      data: payment[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deletePaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Payment.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Payment deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
