import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { config, logger } from '../config/config.js';

export default class EmailSenderService {
  #transporter;

  constructor() {
    const handleBarOptions = {
      viewEngine: {
        partialsDir: path.resolve('src/templates/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('src/templates/'),
    };
    this.#transporter = nodemailer.createTransport({
      host: config.EMAIL.host,
      port: config.EMAIL.port,
      secure: config.EMAIL.secure,
      auth: config.EMAIL.auth,
    });

    this.#transporter.use('compile', hbs(handleBarOptions));
  }

  sendEmail(to, subject, template, context) {
    logger.debug(`Sending email to ${to}}`);
    const mailOptions = {
      from: config.EMAIL.from,
      to,
      subject,
      template,
      context,
    };
    this.#transporter.sendMail(mailOptions, (error, info) => {
      if (error) return logger.error(`Error sending email to ${to} - ${JSON.stringify(error)}`);
      return logger.info(`Email sent successfully - MessageId: ${info.messageId} - Response: ${info.response}`);
    });
  }
}
