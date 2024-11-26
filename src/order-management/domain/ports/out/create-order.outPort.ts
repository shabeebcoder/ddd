import { OrderEntity } from '../../entities/order.entity';

export abstract class CreateOrderOutPort {
  abstract createOrder(order: OrderEntity): Promise<OrderEntity>;
}
