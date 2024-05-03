import nodemailer from "nodemailer";

const sendEmail = async (email, subject, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.HOST_PORT,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: subject,
      text: link,
    });
  } catch (error) {
    console.log("Email not send");
  }
};

export { sendEmail };
