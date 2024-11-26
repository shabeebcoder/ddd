import { ItemEntity } from './items.entity';
import { Aggregate } from 'src/__lib__/aggregate';

interface Attributes {
  id?: string;
  orderNumber?: string;
  orderDate: Date;
  orderItems: ItemEntity[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled';
}

export class OrderEntity extends Aggregate<Attributes> {
  private id?: string;
  private orderNumber?: string;
  private orderDate: Date;
  private orderItems: ItemEntity[];
  private totalAmount: number;
  private status: 'pending' | 'paid' | 'cancelled';
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.orderNumber = attributes.orderNumber;
    this.orderDate = attributes.orderDate;
    this.orderItems = attributes.orderItems;
    this.totalAmount = attributes.totalAmount;
    this.status = attributes.status;
  }
}
