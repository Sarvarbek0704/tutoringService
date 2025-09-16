const {
  addClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
} = require("../controllers/client.controller");
const {
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();
const validate = require("../middlewares/validate");
const {
  createClientSchema,
  updateClientSchema,
} = require("../validations/client.validation");

router.post("/", adminGuard, validate(createClientSchema), addClient);
router.get("/", adminGuard, getAllClients);
router.get("/:id", adminGuard, selfGuard, getClientById);
router.put(
  "/:id",
  adminGuard,
  selfGuard,
  validate(updateClientSchema),
  updateClientById
);
router.delete("/:id", adminGuard, deleteClientById);

module.exports = router;
