import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Operations } from "./Operations";

@Entity()
export class Marketers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Operations, operation => operation.marketer)
    operations_created: Operations[];

    @OneToMany(() => Operations, operation => operation.client)
    operations_traded: Operations[];
}
