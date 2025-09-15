const {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/payment.controller");
const validate = require("../middlewares/validate");
const {
  createPaymentSchema,
  updatePaymentSchema,
} = require("../validations/payment.validation");

const router = require("express").Router();

router.post("/", validate(createPaymentSchema), addPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", validate(updatePaymentSchema), updatePaymentById);
router.delete("/:id", deletePaymentById);

module.exports = router;
