const jwtService = require("../services/jwt.service");
const Client = require("../models/client");
const Admin = require("../models/admin");

const Owner = require("../models/owner");

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

    // Foydalanuvchi turi va ID sini ajratib olish
    const { id, type } = decoded;

    let userModel;

    // Foydalanuvchi turiga qarab modelni tanlash
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
          success: false,
          error: `Noto'g'ri foydalanuvchi turi: ${type}`,
        });
    }

    // Foydalanuvchini topish
    const user = await userModel.findByPk(id);

    if (!user || !user.status) {
      return res.status(403).json({
        success: false,
        error: "Yaroqsiz token yoki foydalanuvchi faol emas",
      });
    }

    // Requestga foydalanuvchi ma'lumotlarini qo'shish
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

    console.error("Auth middleware xatosi:", error);
    res.status(500).json({
      success: false,
      error: "Server xatosi",
    });
  }
};

module.exports = authenticateToken;
