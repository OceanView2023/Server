const nodemailer = require("nodemailer");
const KEY_GOOGLE = process.env.KEY_GOOGLE;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 25,
  secure: false,
  auth: {
    user: "ocean.viewjob2023@gmail.com",
    pass: KEY_GOOGLE,
  },
});

transporter.verify().then(() => {
  console.log("Ready for emails");
});

module.exports = {
  transporter,
};
