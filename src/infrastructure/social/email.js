const nodeMailer = require("nodemailer");
const { logger } = require("@logger");
const { mailer } = require("@config");

class Email{

  constructor(to, subject, text) {
      this.mailOptions = {
        from: "noreply@gmail.com",
        to: "yameenjavaid287@gmail.com",
        subject: subject,
        text: text
      }
    }
  async init() {
      this.transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailer.user,
          pass: mailer.pass,
        },
      });
  }

  async sendMail() {
    try {
      await this.init();
      let result = await this.transporter.sendMail(this.mailOptions);
      logger.info(`${result.messageId}`);
    } catch {
      logger.error("Sending Email Failed");
    }
  }
}


module.exports = Email;