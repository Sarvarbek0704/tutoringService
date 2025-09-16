const clientGuard = (req, res, next) => {
  try {
    // Foydalanuvchi mavjudligini tekshirish
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Kirish huquqi talab qilinadi",
      });
    }

    // Client, Owner yoki Admin huquqlarini tekshirish
    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Faqat mijozlar uchun ruxsat etilgan",
      });
    }

    // Keyingi middlewarega o'tish
    next();
  } catch (error) {
    console.error("Client guard xatosi:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = clientGuard;
