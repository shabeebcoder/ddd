import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class PaymentsOrmEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  amount: number;

  @Column({ default: 'INR' })
  currency: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'card' })
  paymentMode: string;
}
