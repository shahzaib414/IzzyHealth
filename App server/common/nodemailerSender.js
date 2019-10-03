const nodemailer = require('nodemailer');
// const { promisify } = require('util');

const sendEmail = ({ from, to, subject }, { html, text }) => {
  if (!from) {
    throw new Error('from is required');
  }

  if (!to) {
    throw new Error('to is required');
  }

  if (!subject) {
    throw new Error('subject is required');
  }

  if (!html && !text) {
    throw new Error('html or text required');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text: text || '',
    html,
  };

  return transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error); // eslint-disable-line
    } else {
      console.log('Email sent'); // eslint-disable-line
    }
  });
};

module.exports = sendEmail;
