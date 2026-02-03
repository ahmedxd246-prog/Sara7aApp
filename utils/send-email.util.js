import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport
({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ACTIVATE_EMAIL,
      pass: process.env.ACTIVATE_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Sara7a App" <${process.env.ACTIVATE_EMAIL}>`,
    to,
    subject,
    html,
  });
  return info.rejected.length === 0 ? true : false;
};
export const subject = {
  register: 'Activate your account',
  resetPassword: 'Reset your password',
};

export default sendEmail;
