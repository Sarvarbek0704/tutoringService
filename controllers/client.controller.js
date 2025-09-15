const { cli } = require("winston/lib/winston/config");
const Client = require("../models/client");

const addClient = async (req, res) => {
  try {
    const { full_name, email, phone, birth_date, password } = req.body;
    const candidate = await Client.findOne({ where: { email } });
    if (candidate) {
      return res
        .status(403)
        .send({ message: "This email has already been registered." });
    }

    const newClient = await Client.create({
      full_name,
      email,
      phone,
      birth_date,
      password,
    });
    await newClient.save();
    res.status(201).send({
      message: "new client added",
      data: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding client" });
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(201).send({
      message: "All clients",
      data: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing all clients" });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    res.status(200).send({
      message: `Client number ${id}`,
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error viewing one client" });
  }
};

const updateClientById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while updating client" });
  }
};

const deleteClientById = async (req, res) => {
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
    console.log(error);
    res.status(500).send({ error: "Error while deleting client" });
  }
};

module.exports = {
  addClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
};
