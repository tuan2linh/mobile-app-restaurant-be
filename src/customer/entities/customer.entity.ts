import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Table } from '../../table/entities/table.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToOne(() => Table, { nullable: true })
  @JoinColumn()
  table: Table | null;
}
