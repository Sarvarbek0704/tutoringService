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
  adminGuard,
  ownerGuard,
  selfGuard,
  creatorGuard,
} = require("../middlewares/guards");
const router = require("express").Router();

router.post(
  "/",
  adminGuard,
  ownerGuard,
  validate(createCertificateSchema),
  addCertificate
);
router.get("/", adminGuard, ownerGuard, getAllCertificates);
router.get("/:id", adminGuard, ownerGuard, getCertificateById);
router.put(
  "/:id",
  adminGuard,
  ownerGuard,
  validate(updateCertificateSchema),
  updateCertificateById
);
router.delete("/:id", adminGuard, ownerGuard, deleteCertificateById);

module.exports = router;
