const logger = require("../services/logger.service");

function errorHandling(err, req, res, next) {
  logger.error({
    message: err.message,
    name: err.name,
    code: err.code,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  let statusCode = 500;
  let message = "Internal Server Error";
  if (err.status) {
    statusCode = err.status;
    message = err.message || message;
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message =
      "Unique constraint violation: " +
      err.errors.map((e) => e.message).join(", ");
  } else if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Foreign key constraint error";
  } else if (err.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Database error: " + (err.message || "Invalid query");
  } else if (err.name === "SequelizeConnectionError") {
    statusCode = 503;
    message = "Database connection error";
  } else if (err.name === "SequelizeTimeoutError") {
    statusCode = 504;
    message = "Database request timeout";
  } else if (err.code === "23505") {
    statusCode = 409;
    message = "Duplicate value (unique constraint)";
  } else if (err.code === "23503") {
    statusCode = 400;
    message = "Foreign key violation";
  } else if (err.code === "22P02") {
    statusCode = 400;
    message = "Invalid input syntax (for example, wrong ID format)";
  } else if (err.code === "42601") {
    statusCode = 400;
    message = "Syntax error in SQL query";
  } else if (err.code === "42703") {
    statusCode = 400;
    message = "Undefined column in query";
  } else if (err.code === "42P01") {
    statusCode = 400;
    message = "Undefined table in query";
  } else if (err.code === "08003") {
    statusCode = 503;
    message = "Connection does not exist";
  } else if (err.code === "08006") {
    statusCode = 503;
    message = "Connection failure";
  }
  res.status(statusCode).json({
    message,
  });
}

module.exports = errorHandling;
