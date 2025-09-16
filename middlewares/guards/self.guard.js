const selfGuard = (req, res, next) => {
  try {
    // Foydalanuvchi mavjudligini tekshirish
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Kirish huquqi talab qilinadi",
      });
    }

    // URL parametridan foydalanuvchi ID sini olish
    const requestedUserId = req.params.userId || req.params.id;

    // Agar userId parametri bo'lmasa, body dan olish
    const targetUserId = requestedUserId || req.body.userId;

    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: "Foydalanuvchi ID si ko'rsatilmagan",
      });
    }

    // Foydalanuvchi o'z ma'lumotlariga kirish huquqiga ega yoki admin/owner ekanligini tekshirish
    if (
      req.user._id.toString() !== targetUserId &&
      req.user.role !== "admin" &&
      req.user.role !== "owner"
    ) {
      return res.status(403).json({
        success: false,
        message: "Siz faqat o'z ma'lumotlaringizga kirish huquqiga egasiz",
      });
    }

    // Keyingi middlewarega o'tish
    next();
  } catch (error) {
    console.error("Self guard xatosi:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = selfGuard;
