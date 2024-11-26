import { Module } from '@nestjs/common';
import { PaymentController } from './presentation/payment.controller';
import { IntiatePaymentInPort } from './domain/ports/in/intiate-payment.inPort';
import { IntiatePaymentUseCase } from './domain/usecase/intiate-payment.usecase';
import { InitiatePaymentOutPort } from './domain/ports/out/initiate-payment.outPort';
import { PaymentRepository } from './infrastructure/payment.repository';
import { ValidatePaymentInPort } from './domain/ports/in/validate-payment.inPort';
import { ValidatePaymentOutPort } from './domain/ports/out/validate-payment.outPort';
import { ValidatePaymentUseCase } from './domain/usecase/validate-payment.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsOrmEntity } from './infrastructure/orm-entity/payments.orm-entity';
import { PhonePayService } from './infrastructure/service/phone-pay.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentsOrmEntity])],
  controllers: [PaymentController],
  providers: [
    PaymentRepository,
    PhonePayService,
    {
      provide: IntiatePaymentInPort,
      useFactory: (a: InitiatePaymentOutPort) => {
        return new IntiatePaymentUseCase(a);
      },
      inject: [InitiatePaymentOutPort],
    },
    {
      provide: InitiatePaymentOutPort,
      useExisting: PaymentRepository,
    },
    {
      provide: ValidatePaymentOutPort,
      useExisting: PaymentRepository,
    },
    {
      provide: ValidatePaymentInPort,
      useFactory: (a: ValidatePaymentOutPort) => {
        return new ValidatePaymentUseCase(a);
      },
      inject: [ValidatePaymentOutPort],
    },
  ],
  exports: [],
})
export class PaymentModule {}
