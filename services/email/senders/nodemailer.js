const nodemailer = require('nodemailer');

class SenderNodemailer {
   constructor() {
      this.config = {
         host: 'smtp.meta.ua',
         port: 465,
         secure: true,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
         },
      };
   }
   async send(msg) {
      const transporter = nodemailer.createTransport(this.config);
      const result = await transporter.sendMail({
         ...msg,
         from: process.env.SMTP_USER
      });
      return result;
   }
}

module.exports = SenderNodemailer;