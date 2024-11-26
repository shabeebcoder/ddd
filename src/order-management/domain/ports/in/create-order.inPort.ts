import { OrderEntity } from '../../entities/order.entity';

interface Item {
  type: 'rental-agreement' | 'doorstep-delivery' | 'e-signature';
  agreementId?: string;
  deliveryAddress?: string;
  eSignatureLandlordEmail?: string;
  eSignatureTenantEmail?: string;
  eSignatureLandlordPhone?: string;
  eSignatureTenantPhone?: string;
}

export interface CreateOrderParams {
  orderItems: Item[];
}

export abstract class CreateOrderInPort {
  abstract execute(order: CreateOrderParams): Promise<OrderEntity>;
}
