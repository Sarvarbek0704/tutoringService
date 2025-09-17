const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

router.get("/used-services", reportController.getUsedServices);
router.get("/clients-used", reportController.getClientsUsedServices);
router.get("/clients-canceled", reportController.getClientsCanceledServices);
router.get("/top-owners", reportController.getTopOwnersByService);
router.get("/payments-by-client", reportController.getPaymentsByClient);

module.exports = router;
