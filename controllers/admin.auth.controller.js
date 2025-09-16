const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwtService = require("../services/jwt.service");
const { adminRegisterSchema } = require("../validations/admin.validation");

const register = async (req, res, next) => {
  try {
    const { error, value } = adminRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }
    const { full_name, email, password, phone } = value;
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: "This email has been already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const admin = await Admin.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      status: true,
    });
    res.status(201).json({
      success: true,
      message: "Successfully registered",
      data: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        phone: admin.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email adn password is required",
      });
    }
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({
        success: false,
        error: "Email or password incorrect",
      });
    }
    const password2 = await bcrypt.compare(password, admin.password);
    if (!password2) {
      return res.status(400).json({
        success: false,
        error: "Email or password incorrect",
      });
    }
    const tokens = jwtService.generateTokens({
      id: admin.id,
      email: admin.email,
      type: "admin",
      role: "admin",
    });
    await Admin.update(
      { refreshToken: tokens.refreshToken, accessToken: tokens.accessToken },
      { where: { id: admin.id } }
    );
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });
    res.json({
      message: "Successfully logged in",
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

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: "RefreshToken not found in cookies",
      });
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    await Admin.update(
      { refreshToken: null, accessToken: null },
      { where: { id: verifiedRefreshToken.id } }
    );
    res.clearCookie("refreshToken");
    res.json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: "RefreshToken not found in cookie",
      });
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    if (!admin) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (admin.refreshToken !== refreshToken) {
      return res.status(401).json({
        error: "RefreshToken incorrect",
      });
    }
    const tokens = jwtService.generateTokens({
      id: admin.id,
      email: admin.email,
      type: "admin",
      role: "admin",
    });

    await Admin.update(
      { refreshToken: tokens.refreshToken, accessToken: tokens.accessToken },
      { where: { id: admin.id } }
    );

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Token updated",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        error: "Old token, update token",
      });
    }
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
