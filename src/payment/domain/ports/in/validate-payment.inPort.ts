import { PaymentEntity } from '../../entity/payment.entity';

export abstract class ValidatePaymentInPort {
  abstract execute(transactionId: string): Promise<PaymentEntity>;
}
