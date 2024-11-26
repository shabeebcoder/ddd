import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrdersOrmEntity } from './orders.orm-entity';

@Entity('order_items')
export class OrderItemsOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  type: 'rental-agreement' | 'doorstep-delivery' | 'e-signature';

  @Column({ nullable: true })
  deliveryAddress: string;

  @Column({ nullable: true })
  eSignatureLandlordEmail: string;

  @Column({ nullable: true })
  eSignatureTenantEmail: string;

  @Column({ nullable: true })
  eSignatureLandlordPhone: string;

  @Column({ nullable: true })
  eSignatureTenantPhone: string;

  @Column()
  itemDescription: string;

  @ManyToOne(() => OrdersOrmEntity, (order) => order.items)
  order: OrdersOrmEntity;
}
