const Client = require("../models/client");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwtService = require("../services/jwt.service");
const { createClientSchema } = require("../validations/client.validation");
const { generateActivationCode } = require("../helpers/activation.helper");

const register = async (req, res, next) => {
  try {
    const { error, value } = createClientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }
    const { full_name, email, password, phone, birth_date } = value;
    const existingClient = await Client.findOne({ where: { email } });
    if (existingClient) {
      return res.status(400).json({
        error: "This email has already been registered",
      });
    }
    const password2 = await bcrypt.hash(password, 10);
    const activationCode = generateActivationCode();
    const client = await Client.create({
      full_name,
      email,
      password: password2,
      phone,
      birth_date,
      activation_code: activationCode,
      activation_sent_at: new Date(),
      status: false,
    });
    console.log(`Aktivatsiya kodi: ${activationCode}`);

    res.status(201).json({
      message: "Successfully registered. Check your email for activation code.",
      data: {
        id: client.id,
        full_name: client.full_name,
        email: client.email,
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
        error: "Email and password is required",
      });
    }

    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(400).json({
        error: "Email or password incorrect",
      });
    }

    if (!client.status) {
      return res.status(400).json({
        error: "Not activated email. Please activate this email.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Email or password incorrect",
      });
    }

    const tokens = jwtService.generateTokens({
      id: client.id,
      email: client.email,
      role: "client",
    });

    await Client.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: client.id } }
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

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({
        error: "Token not found in cookie",
      });
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    await Client.update(
      { refreshToken: null },
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
        error: "Incorrect refresh token",
      });
    }

    const client = await Client.findByPk(verifiedRefreshToken.id);
    if (!client) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (client.refreshToken !== refreshToken) {
      return res.status(401).json({
        error: "Refresh token incorrect",
      });
    }

    const tokens = jwtService.generateTokens({
      id: client.id,
      email: client.email,
      role: "client",
    });

    await Client.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: client.id } }
    );

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Token yangilandi",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        error: "old token. update token",
      });
    }
    next(error);
  }
};

const activateAccount = async (req, res, next) => {
  try {
    const { email, activation_code } = req.body;

    if (!email || !activation_code) {
      return res.status(400).json({
        error: "email and activation code required",
      });
    }

    const client = await Client.findOne({ where: { email } });

    if (!client) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    if (client.activation_code !== activation_code) {
      return res.status(400).json({
        error: "Incorrect activation code",
      });
    }

    const activationTime = new Date(client.activation_sent_at);
    const currentTime = new Date();
    const diffInHours = (currentTime - activationTime) / (1000 * 60 * 60);

    if (diffInHours > 1) {
      return res.status(400).json({
        error: "activation code is older, update this",
      });
    }

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
      message: "Your email is succesfully activated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  activateAccount,
};
