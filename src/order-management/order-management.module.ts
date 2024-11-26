import { Module } from '@nestjs/common';
import { OrderManagementController } from './presentation/order-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersOrmEntity } from './infrstructure/orm-entity/orders.orm-entity';
import { OrderItemsOrmEntity } from './infrstructure/orm-entity/order-items.orm-entity';
import { ProductOrmEntity } from './infrstructure/orm-entity/product.orm-entity';
import { FindOrdersOutPort } from './domain/ports/out/find-orders.outPort';
import { OrderManagementRepository } from './infrstructure/order-management.repository';
import { CreateOrderOutPort } from './domain/ports/out/create-order.outPort';
import { CreateOrderInPort } from './domain/ports/in/create-order.inPort';
import { CreateOrderUseCase } from './domain/usecase/create-order.usecase';
import { FindOrdersInPort } from './domain/ports/in/find-orders.inPort';
import { FindOrdersUseCase } from './domain/usecase/find-orders.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderItemsOrmEntity,
      OrdersOrmEntity,
      ProductOrmEntity,
    ]),
  ],
  controllers: [OrderManagementController],
  providers: [
    OrderManagementRepository,
    {
      provide: FindOrdersOutPort,
      useExisting: OrderManagementRepository,
    },
    {
      provide: CreateOrderOutPort,
      useExisting: OrderManagementRepository,
    },
    {
      provide: CreateOrderInPort,
      useFactory: (a) => new CreateOrderUseCase(a),
      inject: [CreateOrderOutPort],
    },
    {
      provide: FindOrdersInPort,
      useFactory: (a) => new FindOrdersUseCase(a),
      inject: [FindOrdersOutPort],
    },
  ],
  exports: [],
})
export class OrderManagementModule {}
