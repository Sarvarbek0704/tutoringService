const { cli } = require("winston/lib/winston/config");
const Payment = require("../models/payment");

const addPayment = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error adding payment" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(201).send({
      message: "All payments",
      data: payments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing all payments" });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    res.status(200).send({
      message: `Payment number ${id}`,
      data: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing one payment" });
  }
};

const updatePaymentById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while updating payment" });
  }
};

const deletePaymentById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while deleting payment" });
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
