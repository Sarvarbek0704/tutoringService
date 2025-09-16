const express = require("express");
const router = express.Router();
const authController = require("../controllers/client.auth.controller");
const validate = require("../middlewares/validate");
const { createClientSchema } = require("../validations/client.validation");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Routes
router.post("/register", validate(createClientSchema), authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);
router.post("/activate", authController.activateAccount);
router.get("/profile", authenticateToken, authController.getProfile);

module.exports = router;
