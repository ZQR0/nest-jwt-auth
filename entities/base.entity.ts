import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntityEx {

    @PrimaryGeneratedColumn()
    id: number;

}