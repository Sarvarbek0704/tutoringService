const nodemailer = require("nodemailer");
const config = require("config");

// Email transporter yaratish
const transporter = nodemailer.createTransport({
  service: "gmail", // yoki boshqa provider
  auth: {
    user: config.get("email.user"),
    pass: config.get("email.password"),
  },
});

// Faollashtirish emailini yuborish
const sendActivationEmail = async (email, full_name, activationCode) => {
  try {
    const activationLink = `${config.get(
      "frontend_url"
    )}/activate?email=${email}&code=${activationCode}`;

    const mailOptions = {
      from: config.get("email.user"),
      to: email,
      subject: "Hisobingizni faollashtirish",
      html: `
        <div style="font-family: Arial, sans-serif; max-inline-size: 600px; margin: 0 auto;">
          <h2>Salom ${full_name}!</h2>
          <p>Hisobingizni faollashtirish uchun quyidagi havolani bosing:</p>
          <a href="${activationLink}" 
             style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
            Hisobni faollashtirish
          </a>
          <p>Yoki quyidagi kodni kiriting: <strong>${activationCode}</strong></p>
          <p>Havolaning amal qilish muddati: 24 soat</p>
          <p>Agar siz bu hisobni yaratmagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email yuborishda xato:", error);
    return false;
  }
};

// Parolni tiklash emaili
const sendPasswordResetEmail = async (email, full_name, resetToken) => {
  try {
    const resetLink = `${config.get(
      "frontend_url"
    )}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: config.get("email.user"),
      to: email,
      subject: "Parolni tiklash",
      html: `
        <div style="font-family: Arial, sans-serif; max-inline-size: 600px; margin: 0 auto;">
          <h2>Salom ${full_name}!</h2>
          <p>Parolingizni tiklash uchun quyidagi havolani bosing:</p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">
            Parolni tiklash
          </a>
          <p>Havolaning amal qilish muddati: 1 soat</p>
          <p>Agar siz parolni tiklash so'rovini yubormagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Password reset email error:", error);
    return false;
  }
};

module.exports = {
  transporter,
  sendActivationEmail,
  sendPasswordResetEmail,
};
