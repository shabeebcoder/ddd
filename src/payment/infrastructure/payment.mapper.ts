import { PaymentEntity } from '../domain/entity/payment.entity';
import { PaymentsOrmEntity } from './orm-entity/payments.orm-entity';

export class PaymentMapper {
  static mapToOrm(ormEntity: PaymentEntity): PaymentsOrmEntity {
    const paymentReadOnly = ormEntity.export();
    const paymentOrmEntity = new PaymentsOrmEntity();
    paymentOrmEntity.amount = paymentReadOnly.amount;
    paymentOrmEntity.currency = paymentReadOnly.currency;
    paymentOrmEntity.status = paymentReadOnly.status;
    paymentOrmEntity.paymentMode = paymentReadOnly.paymentMode;
    return paymentOrmEntity;
  }

  static mapToDomain(ormEntity: PaymentsOrmEntity): PaymentEntity {
    return new PaymentEntity({
      amount: ormEntity.amount,
      currency: ormEntity.currency,
      status: ormEntity.status,
      paymentMode: ormEntity.paymentMode,
    });
  }
}
