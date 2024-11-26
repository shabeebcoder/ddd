import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../domain/entities/order.entity';
import { CreateOrderOutPort } from '../domain/ports/out/create-order.outPort';
import { FindOrdersOutPort } from '../domain/ports/out/find-orders.outPort';
import { DataSource, Repository } from 'typeorm';
import { OrdersOrmEntity } from './orm-entity/orders.orm-entity';
import { OrderManagementMapper } from './order-management.mapper';
import { OutboxMapper } from 'src/__relay_/outbox.mapper';

export class OrderManagementRepository
  implements FindOrdersOutPort, CreateOrderOutPort
{
  ordersData: OrderEntity[];
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(OrdersOrmEntity)
    private readonly orderRepository: Repository<OrdersOrmEntity>,
  ) {}

  async findOrders(): Promise<OrderEntity[]> {
    const ordersOrm = await this.orderRepository.find();
    return ordersOrm.map((order) => OrderManagementMapper.mapToDomain(order));
  }

  async createOrder(order: OrderEntity): Promise<OrderEntity> {
    const outboxOrm = order
      .pullMessages()
      .map((event) => OutboxMapper.mapToOrm(event, '1234567890'));
    console.log('outboxOrm', outboxOrm);
    const orderOrm = OrderManagementMapper.mapToOrm(order);
    const createdOrder = await this.dataSource.transaction(async (manager) => {
      await manager.save(outboxOrm);
      const createdOrderOrm = await manager.save(orderOrm);
      return createdOrderOrm;
    });
    console.log(createdOrder);
    return OrderManagementMapper.mapToDomain(createdOrder);
  }
}
