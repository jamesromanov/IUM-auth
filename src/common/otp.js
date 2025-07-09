const { createTransport } = require("nodemailer");
const err = require("../utils/err");
const tarnsporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.USER, pass: process.env.USER_PASS },
});

const sendMail = (userMail, message) => {
  try {
    const mailOptions = {
      from: process.env.USER,
      to: userMail,
      subject: "OTP manager",
      text: message,
      name: "JAMSHID",
    };

    tarnsporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log("Mail is sent");
    });
  } catch (error) {
    console.log("ERROR:", err);
  }
};

module.exports = { sendMail };
