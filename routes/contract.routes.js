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
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post("/", adminGuard, validate(createContractSchema), addContract);
router.get("/", adminGuard, getAllContracts);
router.get("/:id", adminGuard, getContractById);
router.put(
  "/:id",
  adminGuard,
  validate(updateContractSchema),
  updateContractById
);
router.delete("/:id", adminGuard, deleteContractById);

module.exports = router;
