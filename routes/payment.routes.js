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
const {
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post("/", adminGuard, validate(createPaymentSchema), addPayment);
router.get("/", adminGuard, getAllPayments);
router.get("/:id", adminGuard, getPaymentById);
router.put(
  "/:id",
  adminGuard,
  validate(updatePaymentSchema),
  updatePaymentById
);
router.delete("/:id", adminGuard, deletePaymentById);

module.exports = router;
