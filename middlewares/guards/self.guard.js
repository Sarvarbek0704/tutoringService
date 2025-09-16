const selfGuard = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Kirish huquqi talab qilinadi",
      });
    }
    const requestedUserId = req.params.id;

    const targetUserId = requestedUserId || req.body.userId;

    if (!targetUserId) {
      return res.status(400).json({
        message: "User ID not specified",
      });
    }
    if (
      req.user.id.toString() !== targetUserId &&
      req.user.role !== "admin" &&
      req.user.role !== "creator"
    ) {
      return res.status(403).json({
        message: "You only have access to your own data.",
      });
    }
    next();
  } catch (error) {
    console.error("Self guard error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = selfGuard;
