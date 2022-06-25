import nodemailer from 'nodemailer';
import { config, logger } from '../config/config.js';

export default class EmailSenderService {
  #transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: config.EMAIL.host,
      port: config.EMAIL.port,
      secure: config.EMAIL.secure,
      auth: config.EMAIL.auth,
    });
  }

  sendEmail(to, text, subject, html) {
    logger.debug(`Sending email to ${to} with text ${text}`);
    const mailOptions = {
      from: config.EMAIL.from,
      to,
      subject,
      text,
      html,
    };
    this.#transporter.sendMail(mailOptions, (error, info) => {
      if (error) return logger.error(`Error sending email to ${to} - ${JSON.stringify(error)}`);
      return logger.info(`Email sent successfully - MessageId: ${info.messageId} - Response: ${info.response}`);
    });
  }
}
