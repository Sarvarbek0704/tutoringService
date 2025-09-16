const jwtService = require("../services/jwt.service");
const Client = require("../models/client");
const Admin = require("../models/admin");
const Owner = require("../models/owner");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Access token need",
      });
    }
    const decoded = await jwtService.verifyAccessToken(token);
    const { id, type } = decoded;
    let userModel;
    switch (type) {
      case "admin":
        userModel = Admin;
        break;
      case "creator":
        userModel = Admin;
        break;
      case "client":
        userModel = Client;
        break;
      case "owner":
        userModel = Owner;
        break;
      default:
        return res.status(403).json({
          error: `Invalid user type: ${type}`,
        });
    }
    const user = await userModel.findByPk(id);
    if (!user || !user.status) {
      return res.status(403).json({
        error: "Invalid token or inactive user",
      });
    }
    req.user = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: type,
      type: type,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        error: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        error: "Token expired",
      });
    }

    console.error("Auth middleware error:", error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

module.exports = authenticateToken;
