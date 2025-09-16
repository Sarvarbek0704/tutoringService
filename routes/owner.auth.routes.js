const express = require("express");
const router = express.Router();
const authController = require("../controllers/owner.auth.controller");
const validate = require("../middlewares/validate");
const { createOwnerSchema } = require("../validations/owner.validation");
const { authenticateToken } = require("../middlewares/guards/index");

router.post("/register", validate(createOwnerSchema), authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
