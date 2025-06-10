const nodemailer = require("nodemailer");

async function sendMail(receiver, template) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // your Gmail address
        pass: process.env.APP_PASSWORD, // the app password you generated
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiver,
      subject: "Notification Baladiti ✔",
      html: template,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendMail;
