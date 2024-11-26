import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../domain/entity/payment.entity';
import { InitiatePaymentOutPort } from '../domain/ports/out/initiate-payment.outPort';
import { ValidatePaymentOutPort } from '../domain/ports/out/validate-payment.outPort';
import { DataSource, Repository } from 'typeorm';
import { PaymentsOrmEntity } from './orm-entity/payments.orm-entity';
import { PaymentMapper } from './payment.mapper';
import { PhonePayService } from './service/phone-pay.service';

export class PaymentRepository
  implements InitiatePaymentOutPort, ValidatePaymentOutPort
{
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(PaymentsOrmEntity)
    private readonly paymentRepository: Repository<PaymentsOrmEntity>,
    private readonly phonePayService: PhonePayService,
  ) {}

  async initiatePayment(paymentEntity: PaymentEntity): Promise<{
    paymentEntity: PaymentEntity;
    redirectUrl: string;
  }> {
    const paymentOrm = PaymentMapper.mapToOrm(paymentEntity);
    const createdPaymentTransaction = await this.dataSource.transaction(
      async (manager) => {
        const ormEntity = await manager.save(paymentOrm);
        const paymentInitiate = await this.phonePayService.intiatePayment();
        if (paymentInitiate.success !== true) {
          throw new Error('Payment initiation failed');
        }
        return { ormEntity, paymentInitiate };
      },
    );
    const paymentDomainEntity = PaymentMapper.mapToDomain(
      createdPaymentTransaction.ormEntity,
    );
    return {
      paymentEntity: paymentDomainEntity,
      redirectUrl: createdPaymentTransaction.paymentInitiate.redirectUrl,
    };
  }

  async validatePayment(): Promise<PaymentEntity> {
    return new PaymentEntity({
      amount: 100,
      status: 'success',
      currency: 'USD',
      paymentMode: 'card',
    });
  }
}
