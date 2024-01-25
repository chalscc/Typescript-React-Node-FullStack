import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Marketers } from "./Marketers";

@Entity()
export class Operations {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Marketers, marketer => marketer.operations_created)
  @JoinColumn({ name: "marketer_id" })
  marketer: Marketers;

  @ManyToOne(() => Marketers, marketer => marketer.operations_traded)
  @JoinColumn({ name: "client_id" })
  client: Marketers;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column() // compra/venta
  type: string;

  @Column()
  amount: number;

  @Column("decimal", { precision: 5, scale: 2 })
  price: number;

}
