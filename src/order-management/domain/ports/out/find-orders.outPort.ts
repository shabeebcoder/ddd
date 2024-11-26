import { OrderEntity } from '../../entities/order.entity';

export abstract class FindOrdersOutPort {
  abstract findOrders(): Promise<OrderEntity[]>;
}
