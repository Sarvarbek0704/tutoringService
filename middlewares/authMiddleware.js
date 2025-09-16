const jwtService = require("../services/jwt.service");
const { Client } = require("../models");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access token kerak",
      });
    }

    const decoded = await jwtService.verifyAccessToken(token);
    const client = await Client.findByPk(decoded.id);

    if (!client || !client.status) {
      return res.status(403).json({
        success: false,
        error: "Yaroqsiz token",
      });
    }

    req.client = {
      id: client.id,
      email: client.email,
      full_name: client.full_name,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        error: "Yaroqsiz token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        error: "Token muddati o'tgan",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server xatosi",
    });
  }
};

module.exports = {
  authenticateToken,
};
