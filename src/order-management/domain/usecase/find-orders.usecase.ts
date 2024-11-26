import { OrderEntity } from '../entities/order.entity';
import { FindOrdersInPort } from '../ports/in/find-orders.inPort';
import { FindOrdersOutPort } from '../ports/out/find-orders.outPort';

export class FindOrdersUseCase implements FindOrdersInPort {
  constructor(private readonly findOrdersOutPort: FindOrdersOutPort) {}

  execute(): Promise<OrderEntity[]> {
    return this.findOrdersOutPort.findOrders();
  }
}
