const creatorGuard = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Access is required",
      });
    }

    if (req.user.role !== "creator") {
      return res.status(403).json({
        message: "Allowed only for creators",
      });
    }
    next();
  } catch (error) {
    console.error("Creator guard error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = creatorGuard;
