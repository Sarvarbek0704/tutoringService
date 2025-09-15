const { sendErrorResponse } = require("../helpers/send.error.response");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { full_name, email, password, confirm_password, phone } = req.body;
    const candidate = await Admin.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse(
        { message: "This email has already been registered." },
        res,
        403
      );
    }

    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Passwords do not match" }, res, 400);
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await Admin.create({
      full_name,
      email,
      password: hashed_password,
      phone,
    });

    res.status(201).send({
      message: "New admin created successfully",
      data: newAdmin,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).send({
      message: "All admins",
      data: admins,
    });
  } catch (error) {
    sendErrorResponse({ message: "Admins get error" }, res, 500);
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    console.log(admin);

    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.status(200).send({
      message: `Admin number`,
      data: admin,
    });
  } catch (error) {
    sendErrorResponse({ message: "Admin get error" }, res, 500);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const admin = await Admin.update(body, {
      where: { id },
      returning: true,
    });

    res.status(200).send({
      message: "Admin updated successfuly",
      data: admin[1][0],
    });
  } catch (error) {
    return sendErrorResponse({ message: "Error update admin" }, res, 500);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.destroy({ where: { id } });

    res.status(202).send({
      message: "Admin deleted successfuly",
      data: admin,
    });
  } catch (error) {
    sendErrorResponse({ message: "Error deleting admin" }, res, 500);
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
