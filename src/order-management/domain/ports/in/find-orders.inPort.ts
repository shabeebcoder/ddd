import { OrderEntity } from '../../entities/order.entity';

export abstract class FindOrdersInPort {
  abstract execute(): Promise<OrderEntity[]>;
}
