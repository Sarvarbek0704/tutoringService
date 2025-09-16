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
  validate(createPaymentSchema),
  addPayment
);
router.get("/", authenticateToken, adminGuard, getAllPayments);
router.get("/:id", authenticateToken, adminGuard, getPaymentById);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  validate(updatePaymentSchema),
  updatePaymentById
);
router.delete("/:id", authenticateToken, adminGuard, deletePaymentById);

module.exports = router;
