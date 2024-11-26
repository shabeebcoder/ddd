import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentalAgreementModule } from './rental-agreement/rental-agreement.module';
import { PaymentModule } from './payment/payment.module';
import { OrderManagementModule } from './order-management/order-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';
import { kafkaClientOptions } from './kafka.clinet';
import { ClientsModule } from '@nestjs/microservices';
import { RelayModule } from './__relay_/relay.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    RentalAgreementModule,
    PaymentModule,
    NotificationModule,
    OrderManagementModule,
    RelayModule,
    ScheduleModule.forRoot(),
    ClientsModule.register([kafkaClientOptions]),
    TypeOrmModule.forRoot({
      type: 'postgres', // Specify PostgreSQL
      host: 'localhost', // Database host, default is localhost
      port: 5432, // Database port (default: 5432)
      username: 'postgres', // PostgreSQL username
      password: 'your_password', // Your PostgreSQL password
      database: 'rentowl-v2', // Your PostgreSQL database name
      entities: [__dirname + '/**/*.orm-entity{.ts,.js}'], // Path to your entities
      synchronize: true, // Auto-create database schema (not recommended in production)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
