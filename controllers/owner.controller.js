const Owner = require("../models/owner");
const { sendErrorResponse } = require("../helpers/send.error.response");

const addOwner = async (req, res, next) => {
  try {
    const {
      full_name,
      email,
      phone,
      specialization,
      password,
      confirm_password,
    } = req.body;
    const candidate = await Owner.findOne({ where: { email } });
    if (candidate) {
      return res
        .status(403)
        .send({ message: "This email has already been registered." });
    }
    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Passwords is incorrect" }, res, 403);
    }
    const newOwner = await Owner.create({
      full_name,
      email,
      phone,
      specialization,
      password,
    });
    await newOwner.save();
    res.status(201).send({
      message: "new owner added",
      data: newOwner,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOwners = async (req, res, next) => {
  try {
    const owners = await Owner.findAll();
    res.status(201).send({
      message: "All owners",
      data: owners,
    });
  } catch (error) {
    next(error);
  }
};

const getOwnerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    res.status(200).send({
      message: `Owner number ${id}`,
      data: owner,
    });
  } catch (error) {
    next(error);
  }
};

const updateOwnerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await Owner.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(owner);
    res.status(200).send({
      message: "owner updated",
      data: owner[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteOwnerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Owner.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Owner deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
};
