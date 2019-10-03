const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const constant = require('../constants');

sgMail.setApiKey(constant.SEND_GRID_API_KEY);
exports.sendVerificationEmail = async (to, token) => {
  const hostUrl = constant.HOST;
  const url = `http://${hostUrl}/Users/verify-email?token=${token}&email=${to}`;

  /**
   * Implementation using SendGrid
   */
  /*
    const hostUrl = constant.HOST
    const url = hostUrl+"/verifyEmail?token="+token+"&email="+to
    const msg = {
        to: to,
        from: constant.SEND_GRID_SENDER,
        subject: 'Verify Your Email',
        text: 'Please verify your email',
        html: 'Click on this link to verify your email '+url
      };
      sgMail.send(msg,function(err,res){
          if (err) {
              console.log(err)
          } 
          console.log(res)
      })
      ; */

  /**
   * Implementation using Nodemailer
   */
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: constant.EMAIL_SENDER,
      pass: constant.PASS,
    },
  });
  const mailOptions = {
    from: constant.EMAIL_SENDER,
    to,
    subject: ' Email Verification',
    text: 'Please Verify your email ',
    html: `<b>Click on this link to verify your email ${url}</b>`,
  };
  await transporter.sendMail(mailOptions);
};
