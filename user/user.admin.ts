import { UserEntity } from "src/entities/user.entity";
import { AdminEntity } from 'nestjs-admin'


export class UserAdmin extends AdminEntity {
    entity = UserEntity
}