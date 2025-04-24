import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Table } from '../../table/entities/table.entity';

@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Table, (table) => table.zone)
  tables: Table[];
}
