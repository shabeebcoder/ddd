import { ItemEntity } from '../entities/items.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderCreatedEvent } from '../events/order-created.ent';
import {
  CreateOrderInPort,
  CreateOrderParams,
} from '../ports/in/create-order.inPort';
import { CreateOrderOutPort } from '../ports/out/create-order.outPort';
import { randomUUID } from 'crypto';

export class CreateOrderUseCase implements CreateOrderInPort {
  constructor(private readonly findOrdersOutPort: CreateOrderOutPort) {}

  execute(createOrderParams: CreateOrderParams): Promise<OrderEntity> {
    const newOrder = new OrderEntity({
      id: randomUUID(),
      orderDate: new Date(),
      orderItems: createOrderParams.orderItems.map((item) => {
        return new ItemEntity({
          name: item.type,
          description: item.type,
          price: 100,
          type: item.type,
          rentalAgreementId: item.agreementId,
          deliveryAddress: item.deliveryAddress,
          eSignatureLandlordEmail: item.eSignatureLandlordEmail,
          eSignatureTenantEmail: item.eSignatureTenantEmail,
          eSignatureLandlordPhone: item.eSignatureLandlordPhone,
          eSignatureTenantPhone: item.eSignatureTenantPhone,
        });
      }),
      totalAmount: 100,
      status: 'pending',
    });
    newOrder.addMessage(
      new OrderCreatedEvent({
        payload: {
          orderId: newOrder.export().id,
          customerId: 'customerId',
        },
        aggregateId: newOrder.export().id,
      }),
    );
    return this.findOrdersOutPort.createOrder(newOrder);
  }
}
