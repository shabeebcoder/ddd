import { PaymentEntity } from '../../entity/payment.entity';

export abstract class IntiatePaymentInPort {
  abstract execute(): Promise<{
    paymentEntity: PaymentEntity;
    redirectUrl: string;
  }>;
}
