import { BaseEntityEx } from "./base.entity";
import { Column, Entity } from "typeorm";

//Gender enum
export enum Gender {
    male = 'male',
    female = 'female'
}

//User entity
@Entity()
export class UserEntity extends BaseEntityEx {

    @Column({
        nullable: false
    })
    email: string;

    @Column()
    name: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column()
    surname: string;

    @Column({
        nullable: true
    })
    age: number;

    @Column({
        nullable: true
    })
    status?: string;

    @Column({
        nullable: true
    })
    city?: string;

    @Column({
        default: true,
    })
    isActive: boolean;

    @Column({
        default: false,
    })
    isVerified: boolean;

    @Column({
        nullable: true
    })
    avatarPath: string;

    @Column({
        type: Date,
        nullable: true
    })
    birthdayDate: Date;

    @Column({
        nullable: true
    })
    friendsCount?: number;
    
    @Column({
        enum: Gender,
        nullable: true
    })
    gender?: string;

    @Column('text', {
        array: true,
        nullable: true
    })
    friends: string[]

}