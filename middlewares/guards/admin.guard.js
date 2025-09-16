const adminGuard = (req, res, next) => {
  try {
    // Foydalanuvchi mavjudligini tekshirish
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Kirish huquqi talab qilinadi",
      });
    }

    // Admin huquqlarini tekshirish
    if (req.user.role !== "creator" && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Faqat creatorlar va administratorlar uchun ruxsat etilgan",
      });
    }

    // Keyingi middlewarega o'tish
    next();
  } catch (error) {
    console.error("Admin guard xatosi:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = adminGuard;
