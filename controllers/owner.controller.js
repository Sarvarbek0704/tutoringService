const { cli } = require("winston/lib/winston/config");
const Owner = require("../models/owner");
const { sendErrorResponse } = require("../helpers/send.error.response");

const addOwner = async (req, res) => {
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
      return sendErrorResponse({ message: "parollar togri kelmaydi" }, res, 403);
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
    console.log(error);
    res.status(500).send({ error: "Error adding owner" });
  }
};

const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.status(201).send({
      message: "All owners",
      data: owners,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing all owners" });
  }
};

const getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    res.status(200).send({
      message: `Owner number ${id}`,
      data: owner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing one owner" });
  }
};

const updateOwnerById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while updating owner" });
  }
};

const deleteOwnerById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while deleting owner" });
  }
};

module.exports = {
  addOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
};
