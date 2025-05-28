import nodemailer, { type Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const mailOptions = {
    from: process.env.NODEMAILER_PASS,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions).catch(() => {});
  console.info(`Email sent to ${to}`);
}
