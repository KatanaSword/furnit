import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "Furnit",
      link: "http://localhost:8080",
      logo: "",
      logoHeight: "30px",
      copyright: "Copyright © 2024 Furnit. All rights reserved.",
    },
  });

  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_HOST_PORT,
      auth: {
        user: process.env.NODEMAILER_USER_EMAIL,
        pass: process.env.NODEMAILER_USER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_USER_EMAIL,
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailHTML,
    });
  } catch (error) {
    console.log("Email not send");
  }
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: `${username}`,
      intro:
        "You have received this email because a password reset request for your account was received.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#EE3266",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { sendEmail, forgotPasswordMailgenContent };
