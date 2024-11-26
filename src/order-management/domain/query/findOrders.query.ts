import { OrderEntity } from '../entities/order.entity';
import { FindOrdersInPort } from '../ports/in/find-orders.inPort';
import { FindOrdersOutPort } from '../ports/out/find-orders.outPort';

export class FindOrdersQuery implements FindOrdersInPort {
  constructor(private findOrderOutPort: FindOrdersOutPort) {}
  execute(): Promise<OrderEntity[]> {
    return this.findOrderOutPort.findOrders();
  }
}
