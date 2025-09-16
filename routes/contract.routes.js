const {
  addContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
} = require("../controllers/contract.controller");
const validate = require("../middlewares/validate");
const {
  createContractSchema,
  updateContractSchema,
} = require("../validations/contract.validation");
const {
  authenticateToken,
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post(
  "/",
  authenticateToken,
  adminGuard,
  validate(createContractSchema),
  addContract
);
router.get("/", authenticateToken, adminGuard, getAllContracts);
router.get("/:id", authenticateToken, adminGuard, getContractById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  validate(updateContractSchema),
  updateContractById
);
router.delete("/:id", authenticateToken, adminGuard, deleteContractById);

module.exports = router;
