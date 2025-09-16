const creatorGuard = (req, res, next) => {
  try {
    // Foydalanuvchi mavjudligini tekshirish
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Kirish huquqi talab qilinadi",
      });
    }

    // Creator huquqlarini tekshirish (masalan, content_creator roli)
    if (req.user.role !== "creator" && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Faqat creatorlar uchun ruxsat etilgan",
      });
    }

    // Keyingi middlewarega o'tish
    next();
  } catch (error) {
    console.error("Creator guard xatosi:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = creatorGuard;
