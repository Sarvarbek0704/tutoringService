const Client = require("../models/client");
const bcrypt = require("bcrypt");

const addClient = async (req, res, next) => {
  try {
    const { full_name, email, phone, birth_date, password } = req.body;
    const candidate = await Client.findOne({ where: { email } });
    if (candidate) {
      return res
        .status(403)
        .send({ message: "This email has already been registered." });
    }

    const hashed_password = await bcrypt.hash(password, 7);
    const newClient = await Client.create({
      full_name,
      email,
      phone,
      birth_date,
      password: hashed_password,
    });
    await newClient.save();
    res.status(201).send({
      message: "new client added",
      data: newClient,
    });
  } catch (error) {
    next(error);
  }
};

const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.findAll();
    res.status(201).send({
      message: "All clients",
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    res.status(200).send({
      message: `Client number ${id}`,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

const updateClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(client);
    res.status(200).send({
      message: "client updated",
      data: client[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Client.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Client deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
};
