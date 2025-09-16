const {
  addCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificateById,
  deleteCertificateById,
} = require("../controllers/certificate.controller");
const validate = require("../middlewares/validate");
const {
  createCertificateSchema,
  updateCertificateSchema,
} = require("../validations/certificate.validations");
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
  ownerGuard,
  validate(createCertificateSchema),
  addCertificate
);
router.get("/", authenticateToken, adminGuard, ownerGuard, getAllCertificates);
router.get(
  "/:id",
  authenticateToken,
  adminGuard,
  ownerGuard,
  getCertificateById
);
router.put(
  "/:id",
  authenticateToken,
  adminGuard,
  ownerGuard,
  validate(updateCertificateSchema),
  updateCertificateById
);
router.delete(
  "/:id",
  authenticateToken,
  adminGuard,
  ownerGuard,
  deleteCertificateById
);

module.exports = router;
