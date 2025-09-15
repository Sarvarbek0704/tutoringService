const {
  addClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
} = require("../controllers/client.controller");

const router = require("express").Router();
const validate = require("../middlewares/validate");
const {
  createClientSchema,
  updateClientSchema,
} = require("../validations/client.validation");

router.post("/", validate(createClientSchema), addClient);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.put("/:id", validate(updateClientSchema), updateClientById);
router.delete("/:id", deleteClientById);

module.exports = router;
