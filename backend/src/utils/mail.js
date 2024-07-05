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

const guestQuestionReplyMailgenContent = (fullName, question, reply) => {
  return {
    body: {
      name: `${fullName}`,
      intro:
        "Thank you for reaching out with your question. I'm pleased to assist you and provide the information you need",
      action: {
        question: `Question: ${question}`,
        answer: `Reply: ${reply}`,
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const orderConfirmatioMailgenContent = (username, items, totalCost) => {
  return {
    body: {
      name: `${username}`,
      intro: "Your order has been processed successfully",
      table: {
        data: items.map((item) => {
          return {
            item: item.product?.name,
            price: `INR ${item.product?.price}/-`,
            quantity: item.quantity,
          };
        }),
        columns: {
          customWidth: {
            item: "20%",
            price: "15%",
            quantity: "15%",
          },
          customAlignment: {
            price: "right",
            quantity: "right",
          },
        },
      },
      outro: [
        `Total order cost: INR ${totalCost}/-`,
        "You can check the status of your order and more in your order history",
      ],
    },
  };
};

export {
  sendEmail,
  forgotPasswordMailgenContent,
  guestQuestionReplyMailgenContent,
  orderConfirmatioMailgenContent,
};
