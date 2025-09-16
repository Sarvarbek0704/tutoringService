const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwtService = require("../services/jwt.service");
const { adminRegisterSchema } = require("../validations/admin.validation");

// Register (Ro'yxatdan o'tish)
const register = async (req, res, next) => {
  try {
    const { error, value } = adminRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((err) => err.message),
      });
    }

    const { full_name, email, password, phone } = value;

    // Email borligini tekshirish
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: "Bu email allaqachon ro'yxatdan o'tgan",
      });
    }

    // Password ni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // Admin yaratish
    const admin = await Admin.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      status: true,
    });
    res.status(201).json({
      success: true,
      message:
        "Ro'yxatdan muvaffaqiyatli o'tdingiz.",
      data: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email va parol kiritilishi shart",
      });
    }

    // Admin ni topish
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({
        success: false,
        error: "Email yoki parol noto'g'ri",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: "Email yoki parol noto'g'ri",
      });
    }

    // Tokenlar yaratish
    const tokens = jwtService.generateTokens({
      id: admin.id,
      email: admin.email,
      role: "admin",
    });

    // Refresh tokenni saqlash
    await Admin.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: admin.id } }
    );

    res.json({
      success: true,
      message: "Muvaffaqiyatli kirdingiz",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        admin: {
          id: admin.id,
          full_name: admin.full_name,
          email: admin.email,
          phone: admin.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Logout (Tizimdan chiqish)
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: "Refresh token kerak",
      });
    }

    // Refresh tokenni o'chirish
    await Admin.update({ refreshToken: null }, { where: { refreshToken } });

    res.json({
      success: true,
      message: "Muvaffaqiyatli chiqdingiz",
    });
  } catch (error) {
    next(error);
  }
};

// Refresh Token (Token yangilash)
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: "Refresh token kerak",
      });
    }

    // Refresh tokenni tekshirish
    const decoded = await jwtService.verifyRefreshToken(refreshToken);

    // Admin ni topish
    const admin = await Admin.findOne({
      where: { id: decoded.id, refreshToken },
    });

    if (!admin) {
      return res.status(403).json({
        success: false,
        error: "Yaroqsiz refresh token",
      });
    }

    // Yangi tokenlar yaratish
    const tokens = jwtService.generateTokens({
      id: admin.id,
      email: admin.email,
      role: "admin",
    });

    // Yangi refresh tokenni saqlash
    await Admin.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: admin.id } }
    );

    res.json({
      success: true,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
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

    next(error);
  }
};

// Profil ma'lumotlarini olish
const getProfile = async (req, res, next) => {
  try {
    const adminId = req.admin.id;

    const admin = await Admin.findByPk(adminId, {
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Foydalanuvchi topilmadi",
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
};
