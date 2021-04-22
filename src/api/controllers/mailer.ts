import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPServer from "smtp-server";
// const nodemailer = require("nodemailer");

const options = {
  host: "smtp.gmail.email",
  port: 587,
  secure: false,
  requireTLS: false,
  auth: {
    user: "vilkelis300@gmail.com ",
    pass: "puodelis2",
  },
};

export async function mailer() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "vilkelis300@gmail.com",
      pass: "puodelis2",
    },
  });

  let info = await transporter.sendMail({
    from: "bakalauras@sedi.com",
    to: "mantas.seras@gmail.com",
    subject: "Cyrikas, sedi",
    text: "Zjbs, padariau, kad galima butu siust per el pasta laiskus, bet dabar dar su savo pastu, reikia tik sukurt nauja el pasta laiskam siust",
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export async function sendEmail({ from, to, subject, html }) {
  const transporter = nodemailer.createTransport(options);
  await transporter.sendMail({ from, to, subject, html });
}
