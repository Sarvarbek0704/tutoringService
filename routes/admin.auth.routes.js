const express = require("express");
const router = express.Router();
const authController = require("../controllers/admin.auth.controller");
const validate = require("../middlewares/validate");
const { adminRegisterSchema } = require("../validations/admin.validation");
const { authenticateToken } = require("../middlewares/guards/index");

router.post(
  "/register",
  validate(adminRegisterSchema),
  authController.register
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
