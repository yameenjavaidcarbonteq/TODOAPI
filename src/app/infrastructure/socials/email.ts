import * as nodeMailer from "nodemailer";
import { logger } from "@logger";
import { mailer } from "@config";

export class Email {
  private mailOptions: nodeMailer.SendMailOptions;
  private transporter!: nodeMailer.Transporter;

  constructor(to: string, subject: string, text: string) {
    this.mailOptions = {
      from: 'Fred Foo  <foo@example.com>',
      to: to,
      subject: subject,
      text: text,
    };
  }

  async init(): Promise<void> {
    this.transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: mailer.user,
        pass: mailer.pass,
      },
    });
  }

  async sendMail(): Promise<void> {
    try {
      await this.init();
      await this.transporter.sendMail(this.mailOptions);
    } catch {
      logger.log(`error`,`Sending Email Failed`);
    }
  }
}


