import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { EmailService } from './services/email.service';

@Module({
  controllers: [NotificationController],
  providers: [EmailService],
  exports: [],
})
export class NotificationModule {}
