import nodemailer from "nodemailer";

const mail = async function (email, password) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const message = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Activate Account",
    html: `<i>To login into your account use this password: ${password}</a></i>`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
      return false;
    } else {
      return email;
    }
  });
};

export default mail;
