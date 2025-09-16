const Owner = require("../models/owner");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwtService = require("../services/jwt.service");
const { ownerRegisterSchema } = require("../validations/owner.validation");

const register = async (req, res, next) => {
  try {
    const { error, value } = ownerRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }

    const { full_name, email, password, phone } = value;
    const existingOwner = await Owner.findOne({ where: { email } });
    if (existingOwner) {
      return res.status(400).json({
        error: "This email has already been registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await Owner.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      status: true,
    });
    res.status(201).json({
      message: "Successfully registered in",
      data: {
        id: owner.id,
        full_name: owner.full_name,
        email: owner.email,
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
        error: "Email and passwrod is required",
      });
    }

    const owner = await Owner.findOne({ where: { email } });
    if (!owner) {
      return res.status(400).json({
        error: "Email or password is incorrect",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, owner.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Email or password is incorrect",
      });
    }

    const tokens = jwtService.generateTokens({
      id: owner.id,
      email: owner.email,
      type: "owner",
      role: "owner",
    });

    await Owner.update(
      { refreshToken: tokens.refreshToken, accessToken: tokens.accessToken },
      { where: { id: owner.id } }
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
        owner: {
          id: owner.id,
          full_name: owner.full_name,
          email: owner.email,
          phone: owner.phone,
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
        error: "Refresh token not found",
      });
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    await Owner.update(
      { refreshToken: null, accessToken: null },
      { where: { id: verifiedRefreshToken.id } }
    );
    res.clearCookie("refreshToken");

    res.json({
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
        error: "Refresh token not found",
      });
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    if (!verifiedRefreshToken) {
      return res.status(401).json({
        error: "Invalid refresh token",
      });
    }

    const owner = await Owner.findByPk(verifiedRefreshToken.id);
    if (!owner) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    if (owner.refreshToken !== refreshToken) {
      return res.status(401).json({
        error: "Refresh is incorrect",
      });
    }

    const tokens = jwtService.generateTokens({
      id: owner.id,
      email: owner.email,
      type: "owner",
      role: "owner",
    });

    await Owner.update(
      { refreshToken: tokens.refreshToken, accessToken: tokens.accessToken },
      { where: { id: owner.id } }
    );

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Token yangilandi",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
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
