import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "iryna.slavinska2023@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "kinedav149@huvacliq.com",
  from: "iryna.slavinska2023@meta.ua",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((err) => console.log(err.message));
