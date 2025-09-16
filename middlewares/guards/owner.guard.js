const ownerGuard = (req, res, next) => {
  try {
    // Foydalanuvchi mavjudligini tekshirish
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Kirish huquqi talab qilinadi",
      });
    }

    // Owner yoki Admin huquqlarini tekshirish
    if (
      req.user.role !== "owner" &&
      req.user.role !== "admin" &&
      req.user.role !== "creator"
    ) {
      return res.status(403).json({
        success: false,
        message: "Faqat ownerlar yoki administratorlar uchun ruxsat etilgan",
      });
    }

    // Keyingi middlewarega o'tish
    next();
  } catch (error) {
    console.error("Owner guard xatosi:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = ownerGuard;
