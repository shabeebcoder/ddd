import { PaymentEntity } from '../entity/payment.entity';
import { IntiatePaymentInPort } from '../ports/in/intiate-payment.inPort';
import { InitiatePaymentOutPort } from '../ports/out/initiate-payment.outPort';

export class IntiatePaymentUseCase implements IntiatePaymentInPort {
  constructor(private initiatePaymentOutPort: InitiatePaymentOutPort) {}

  async execute(): Promise<{
    paymentEntity: PaymentEntity;
    redirectUrl: string;
  }> {
    const newPayment = new PaymentEntity({
      amount: 30000,
      currency: 'INR',
      status: 'pending',
      paymentMode: 'card',
    });
    return this.initiatePaymentOutPort.initiatePayment(newPayment);
  }
}
