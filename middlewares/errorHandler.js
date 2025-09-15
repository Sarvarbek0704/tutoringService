const errorHandler = (err, req, res, next) => {
  // ⛔ CONSOLE.LOG NI O'CHIRIB TASHLAYMIZ
  // console.error('Error:', err.name, err.message);

  // Foreign Key Constraint Error
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Invalid reference ID. The referenced item does not exist.",
      details: {
        table: err.parent?.table || "unknown",
        constraint: err.parent?.constraint || "unknown",
      },
    });
  }

  // Validation Error
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Unique Constraint Error
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Duplicate entry",
      field: err.errors[0]?.path,
    });
  }

  // Boshqa barcha xatoliklar
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorHandler;
