const Mailgen = require('mailgen');

class MailService {
   constructor(sender) {
      this.sender = sender
      this.link = 'https://17e5-176-227-245-46.eu.ngrok.io';
      this.mailgen = new Mailgen({
         theme: 'default',
         product: {
            name: 'Contacts',
            link: this.link,
         },
      });
   }
   createEmailTemplate(username, token) {
      const email = {
         body: {
            name: username,
            intro: 'Welcome to Contacts',
            action: {
               instructions: 'Click the button below to verify your account',
               button: {
                  color: '#22BC66',
                  text: 'Verify',
                  link: `${this.link}api/auth/verify/${token}`,
               },
            },
            outro: 'Thanks',

         }
      }
      return this.mailgen.generate(email);
   }
   async sendMail(email, username, token) {
      const emailTemplate = this.createEmailTemplate(username, token);
      const message = {
         to: email,
         subject: 'Welcome to Contacts',
         html: emailTemplate,
      };
      const result = await this.sender.send(message);
      return result;
   }

}



module.exports = MailService;