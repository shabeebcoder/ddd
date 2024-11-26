import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';

interface OrderCreatedEventPayload {
  orderId: string;
  customerId: string;
}

export class OrderCreatedEvent extends DomainEvent<OrderCreatedEventPayload> {
  constructor(attributes: DomainMessageAttributes<OrderCreatedEventPayload>) {
    super({
      reason: 'The Order was Created',
      payload: attributes.payload,
      messageName: 'order-created',
      aggregateId: attributes.aggregateId,
      aggregateName: 'Order',
      contextName: 'order-management',
    });
  }
}
