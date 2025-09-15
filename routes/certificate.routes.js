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

const router = require("express").Router();

router.post("/", validate(createCertificateSchema), addCertificate);
router.get("/", getAllCertificates);
router.get("/:id", getCertificateById);
router.put("/:id", validate(updateCertificateSchema), updateCertificateById);
router.delete("/:id", deleteCertificateById);

module.exports = router;
