import { PaymentEntity } from '../../entity/payment.entity';

export abstract class ValidatePaymentOutPort {
  abstract validatePayment(transactionId: string): Promise<PaymentEntity>;
}
