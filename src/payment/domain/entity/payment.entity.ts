import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id?: string;
  amount: number;
  currency: string;
  status: string;
  paymentMode: string;
}

export class PaymentEntity extends Entity<Attributes> {
  private id?: string;
  private amount: number;
  private currency: string;
  private status: string;
  private paymentMode: string;

  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.amount = attributes.amount;
    this.currency = attributes.currency;
    this.status = attributes.status;
    this.paymentMode = attributes.paymentMode;
  }

  completePayment() {
    if (this.status === 'completed') {
      throw new Error('Payment already completed');
    }
    if (this.status === 'pending') {
      throw new Error('Only pending payments can be completed.');
    }
    this.status = 'completed';
  }
}
