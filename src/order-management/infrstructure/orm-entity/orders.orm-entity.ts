import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemsOrmEntity } from './order-items.orm-entity';

@Entity('orders')
export class OrdersOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalAmount: number;

  @Column()
  status: 'pending' | 'paid' | 'cancelled';

  @OneToMany(() => OrderItemsOrmEntity, (orderItem) => orderItem.order, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  items: OrderItemsOrmEntity[];
}
