const adminGuard = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Access is required",
      });
    }

    if (req.user.role !== "creator" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Allowed only for creators and administrators",
      });
    }
    next();
  } catch (error) {
    console.error("Admin guard error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = adminGuard;
