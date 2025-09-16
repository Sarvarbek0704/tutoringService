const {
  addClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
} = require("../controllers/client.controller");
const {
  authenticateToken,
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

router.post(
  "/",
  authenticateToken,
  adminGuard,
  validate(createClientSchema),
  addClient
);
router.get("/", authenticateToken, adminGuard, getAllClients);
router.get("/:id", authenticateToken, adminGuard, selfGuard, getClientById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  selfGuard,
  validate(updateClientSchema),
  updateClientById
);
router.delete("/:id", authenticateToken, adminGuard, deleteClientById);

module.exports = router;
