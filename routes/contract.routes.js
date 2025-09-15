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

const router = require("express").Router();

router.post("/", validate(createContractSchema), addContract);
router.get("/", getAllContracts);
router.get("/:id", getContractById);
router.put("/:id", validate(updateContractSchema), updateContractById);
router.delete("/:id", deleteContractById);

module.exports = router;
