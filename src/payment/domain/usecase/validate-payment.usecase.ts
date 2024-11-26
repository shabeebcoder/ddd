import { PaymentEntity } from '../entity/payment.entity';
import { ValidatePaymentOutPort } from '../ports/out/validate-payment.outPort';

export class ValidatePaymentUseCase {
  constructor(private validatePaymentOutPort: ValidatePaymentOutPort) {}

  async execute(transactionId: string): Promise<PaymentEntity> {
    return this.validatePaymentOutPort.validatePayment(transactionId);
  }
}
