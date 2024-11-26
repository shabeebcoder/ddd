import { ItemEntity } from '../domain/entities/items.entity';
import { OrderEntity } from '../domain/entities/order.entity';
import { OrderItemsOrmEntity } from './orm-entity/order-items.orm-entity';
import { OrdersOrmEntity } from './orm-entity/orders.orm-entity';
import { randomUUID } from 'crypto';

export class OrderManagementMapper {
  static mapToOrm(orderEntity: OrderEntity): OrdersOrmEntity {
    const orderReadOnly = orderEntity.export();
    const orderOrmEntity = new OrdersOrmEntity();
    orderOrmEntity.status = orderReadOnly.status;
    orderOrmEntity.totalAmount = orderReadOnly.totalAmount;
    orderOrmEntity.items = orderReadOnly.orderItems.map((item) => {
      const itemReadOnly = item.export();
      const orderItemOrmEntity = new OrderItemsOrmEntity();
      orderItemOrmEntity.id = randomUUID();
      orderItemOrmEntity.price = itemReadOnly.price;
      orderItemOrmEntity.type = itemReadOnly.type;
      orderItemOrmEntity.deliveryAddress = itemReadOnly.deliveryAddress;
      orderItemOrmEntity.eSignatureLandlordEmail =
        itemReadOnly.eSignatureLandlordEmail;
      orderItemOrmEntity.eSignatureTenantEmail =
        itemReadOnly.eSignatureTenantEmail;
      orderItemOrmEntity.eSignatureLandlordPhone =
        itemReadOnly.eSignatureLandlordPhone;
      orderItemOrmEntity.eSignatureTenantPhone =
        itemReadOnly.eSignatureTenantPhone;
      orderItemOrmEntity.itemDescription = itemReadOnly.description;
      orderItemOrmEntity.order = orderOrmEntity;
      return orderItemOrmEntity;
    });
    return orderOrmEntity;
  }
  static mapToDomain(orderOrmEntity: OrdersOrmEntity): OrderEntity {
    return new OrderEntity({
      id: orderOrmEntity.id,
      status: orderOrmEntity.status,
      totalAmount: orderOrmEntity.totalAmount,
      orderNumber: orderOrmEntity.id,
      orderDate: new Date(),
      orderItems: orderOrmEntity.items.map(
        (orderItem) =>
          new ItemEntity({
            id: orderItem.id,
            price: orderItem.price,
            deliveryAddress: orderItem.deliveryAddress,
            eSignatureLandlordEmail: orderItem.eSignatureLandlordEmail,
            eSignatureTenantEmail: orderItem.eSignatureTenantEmail,
            eSignatureLandlordPhone: orderItem.eSignatureLandlordPhone,
            eSignatureTenantPhone: orderItem.eSignatureTenantPhone,
            name: orderItem.itemDescription,
            description: orderItem.itemDescription,
            type: orderItem.type,
          }),
      ),
    });
  }
}
