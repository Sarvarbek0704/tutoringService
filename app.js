const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
const applyAssociations = require("./associations");

const mainRouter = require("./routes/index");
const errorHandling = require("./middlewares/errorHandling");
const logger = require("./services/logger.service");

const PORT = config.get("port") ?? 7777;

const app = express();
app.use(express.json());
app.use(cookieParser());
applyAssociations();
app.use("/api", mainRouter);
app.use(errorHandling);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at http://185.191.141.215:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
