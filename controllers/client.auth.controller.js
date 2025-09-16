const Client = require("../models/client");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwtService = require("../services/jwt.service");
const { createClientSchema } = require("../validations/client.validation");

// Register (Ro'yxatdan o'tish)
const register = async (req, res, next) => {
  try {
    const { error, value } = createClientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((err) => err.message),
      });
    }

    const { full_name, email, password, phone, birth_date } = value;

    // Email borligini tekshirish
    const existingClient = await Client.findOne({ where: { email } });
    if (existingClient) {
      return res.status(400).json({
        success: false,
        error: "Bu email allaqachon ro'yxatdan o'tgan",
      });
    }

    // Password ni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // Activation code yaratish
    const activationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Client yaratish
    const client = await Client.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      birth_date,
      activation_code: activationCode,
      activation_sent_at: new Date(),
      status: false, // Faqat aktivatsiyadan keyin true bo'ladi
    });

    // Activation codeni emailga yuborish (keyinroq to'ldirishingiz mumkin)
    console.log(`Aktivatsiya kodi: ${activationCode}`);

    res.status(201).json({
      success: true,
      message:
        "Ro'yxatdan muvaffaqiyatli o'tdingiz. Aktivatsiya kodini emailingizdan kiriting.",
      data: {
        id: client.id,
        full_name: client.full_name,
        email: client.email,
      },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

// Login (Tizimga kirish)
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email va parol kiritilishi shart",
      });
    }

    // Client ni topish
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(400).json({
        success: false,
        error: "Email yoki parol noto'g'ri",
      });
    }

    // Status tekshirish
    if (!client.status) {
      return res.status(400).json({
        success: false,
        error: "Hisobingiz faollashtirilmagan. Aktivatsiya kodini tekshiring.",
      });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: "Email yoki parol noto'g'ri",
      });
    }

    // Tokenlar yaratish
    const tokens = jwtService.generateTokens({
      id: client.id,
      email: client.email,
      role: "client",
    });

    // Refresh tokenni saqlash
    await Client.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: client.id } }
    );

    res.json({
      success: true,
      message: "Muvaffaqiyatli kirdingiz",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        client: {
          id: client.id,
          full_name: client.full_name,
          email: client.email,
          phone: client.phone,
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
    await Client.update({ refreshToken: null }, { where: { refreshToken } });

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

    // Client ni topish
    const client = await Client.findOne({
      where: { id: decoded.id, refreshToken },
    });

    if (!client) {
      return res.status(403).json({
        success: false,
        error: "Yaroqsiz refresh token",
      });
    }

    // Yangi tokenlar yaratish
    const tokens = jwtService.generateTokens({
      id: client.id,
      email: client.email,
      role: "client",
    });

    // Yangi refresh tokenni saqlash
    await Client.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: client.id } }
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

// Accountni faollashtirish
const activateAccount = async (req, res, next) => {
  try {
    const { email, activation_code } = req.body;

    if (!email || !activation_code) {
      return res.status(400).json({
        success: false,
        error: "Email va aktivatsiya kodi kiritilishi shart",
      });
    }

    const client = await Client.findOne({ where: { email } });

    if (!client) {
      return res.status(404).json({
        success: false,
        error: "Foydalanuvchi topilmadi",
      });
    }

    if (client.activation_code !== activation_code) {
      return res.status(400).json({
        success: false,
        error: "Noto'g'ri aktivatsiya kodi",
      });
    }

    // Aktivatsiya kodini tekshirish (1 soat ichida)
    const activationTime = new Date(client.activation_sent_at);
    const currentTime = new Date();
    const diffInHours = (currentTime - activationTime) / (1000 * 60 * 60);

    if (diffInHours > 1) {
      return res.status(400).json({
        success: false,
        error: "Aktivatsiya kodining muddati o'tgan",
      });
    }

    // Accountni faollashtirish
    await Client.update(
      {
        status: true,
        activation_code: null,
        activation_token: null,
        activation_sent_at: null,
      },
      { where: { id: client.id } }
    );

    res.json({
      success: true,
      message: "Hisobingiz muvaffaqiyatli faollashtirildi",
    });
  } catch (error) {
    next(error);
  }
};

// Profil ma'lumotlarini olish
const getProfile = async (req, res, next) => {
  try {
    const clientId = req.client.id;

    const client = await Client.findByPk(clientId, {
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        error: "Foydalanuvchi topilmadi",
      });
    }

    res.json({
      success: true,
      data: client,
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
  activateAccount,
  getProfile,
};
