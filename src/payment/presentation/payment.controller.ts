import { Controller, Get, Param } from '@nestjs/common';
import { IntiatePaymentInPort } from '../domain/ports/in/intiate-payment.inPort';
import { ValidatePaymentInPort } from '../domain/ports/in/validate-payment.inPort';

@Controller('payment')
export class PaymentController {
  constructor(
    private intiatePaymentInPort: IntiatePaymentInPort,
    private validatePaymentInPort: ValidatePaymentInPort,
  ) {}

  @Get('/intiate')
  getPayment() {
    return this.intiatePaymentInPort.execute();
  }

  @Get('/validate/:merchantTransactionId')
  validatePayment(
    @Param('merchantTransactionId') merchantTransactionId: string,
  ) {
    return this.validatePaymentInPort.execute(merchantTransactionId);
  }
}
