import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface sendEmailProps {
  to: string;
  subject: string;
  template?: string;
  data?: any;
}

@Injectable()
export class EmailService {
  constructor() {}

  sendEmail({ to, subject, template, data }: sendEmailProps) {
    const mailOptions = {
      from: 'rentowl2024@gmail.com',
      to,
      subject: subject,
      html: template + JSON.stringify(data),
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'rentowl2024@gmail.com',
        pass: 'uyva axpe omqv nqfl',
      },
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
