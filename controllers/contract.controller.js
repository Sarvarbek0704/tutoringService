const Contract = require("../models/contract");

const addContract = async (req, res, next) => {
  try {
    const { enrollment_id, start_date, end_date, status, created_at } =
      req.body;
    const newContract = await Contract.create({
      enrollment_id,
      start_date,
      end_date,
      status,
      created_at,
    });
    await newContract.save();
    res.status(201).send({
      message: "new contract added",
      data: newContract,
    });
  } catch (error) {
    next(error);
  }
};

const getAllContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.findAll();
    res.status(201).send({
      message: "All contracts",
      data: contracts,
    });
  } catch (error) {
    next(error);
  }
};

const getContractById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);
    res.status(200).send({
      message: `Contract number ${id}`,
      data: contract,
    });
  } catch (error) {
    next(error);
  }
};

const updateContractById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contract.update(req.body, {
      where: { id },
      returning: true,
    });
    console.log(contract);
    res.status(200).send({
      message: "contract updated",
      data: contract[1][0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteContractById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Contract.destroy({
      where: { id },
    });
    res.status(200).send({
      message: "Contract deleted",
      data: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
};
