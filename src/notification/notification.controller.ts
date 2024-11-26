import { Controller, Post } from '@nestjs/common';
import { EmailService } from './services/email.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-email')
  sendNotification() {
    return this.emailService.sendEmail({
      to: 'shabeebcoder@gmail.com',
      subject: 'Welcome to RentOwl',
    });
  }
}
