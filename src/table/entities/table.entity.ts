import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Zone } from '../../zone/entities/zone.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column({ default: true }) // true = còn trống
  isAvailable: boolean;

  @OneToOne(() => Customer, (customer) => customer.table, { nullable: true })
  customer?: Customer;
  
  @ManyToOne(() => Zone, (zone) => zone.tables)
  zone: Zone;
}
