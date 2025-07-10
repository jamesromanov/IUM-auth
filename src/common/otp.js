const { createTransport } = require("nodemailer");
const err = require("../utils/err");
const tarnsporter = createTransport({
  service: "Gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASS,
  },
});

const sendMail = (userMail, message) => {
  console.log({ user: process.env.USER_MAIL, pass: process.env.USER_PASS });
  try {
    const mailOptions = {
      from: process.env.USER_MAIL,
      to: userMail,
      subject: "Verification code:",
      text: message,
      name: "JAMSHID",
    };

    tarnsporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log("Mail is sent");
    });

    tarnsporter.verify((err, res) => {
      console.log(err, res);
    });
    return "sent";
  } catch (error) {
    console.log("ERROR:", err);
  }
};

module.exports = { sendMail };
