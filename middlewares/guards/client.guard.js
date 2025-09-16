const clientGuard = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Access is required",
      });
    }

    if (req.user.role !== "client") {
      return res.status(403).json({
        message: "Allowed only for customers",
      });
    }
    next();
  } catch (error) {
    console.error("Client guard error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = clientGuard;
