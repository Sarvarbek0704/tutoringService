const ownerGuard = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Access is required",
      });
    }

    if (
      req.user.role !== "owner" &&
      req.user.role !== "admin" &&
      req.user.role !== "creator"
    ) {
      return res.status(403).json({
        message: "Only allowed for owners or administrators",
      });
    }
    next();
  } catch (error) {
    console.error("Owner guard error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = ownerGuard;
