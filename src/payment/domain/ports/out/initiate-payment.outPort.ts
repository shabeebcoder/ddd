import { PaymentEntity } from '../../entity/payment.entity';

export abstract class InitiatePaymentOutPort {
  abstract initiatePayment(paymentEntity: PaymentEntity): Promise<{
    paymentEntity: PaymentEntity;
    redirectUrl: string;
  }>;
}
