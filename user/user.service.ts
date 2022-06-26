import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDTO } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { threadId } from "worker_threads";

@Injectable()
export class UserService {

    constructor(
        private userDTO: UserDTO,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        
        private readonly userEntity: UserEntity
    ) {}

    public async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {id}
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    public async findByName(name: string): Promise<UserEntity[]> {
        const user = await this.userRepository.find({
            where: {name}
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    public async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {email}
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    public async findByEmailWithPassword(email: string, password: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
                password
            }
        })
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async findBySurname(surname: string): Promise<UserEntity[]> {
        const user = await this.userRepository.find({
            where: {surname}
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }


    public async getUserPage(id: number): Promise<UserEntity> {
        return await this.findById(id);
    }

    public async updateUser(id: number, dto: UserDTO): Promise<UserEntity> {
        const user = await this.findById(id);

        user.name = dto.name;
        user.surname = dto.surname;
        user.age = dto.age;
        user.status = dto.status;
        user.city = dto.city;
        user.avatarPath = dto.avatarPath;
        user.birthdayDate = dto.birthdayDate;

        return await this.userRepository.save(user);
    }

    public async createUser(dto: UserDTO): Promise<UserEntity> {
        const user = new UserEntity()
        user.name = dto.name;
        user.surname = dto.surname;
        user.age = dto.age;
        user.status = dto.status;
        user.city = dto.city;
        user.avatarPath = dto.avatarPath;
        user.birthdayDate = dto.birthdayDate;

        return await this.userRepository.save(user);
    }

    public async addToFriend(currentUserId: any, friendId: any) {
        const user = await this.findById(currentUserId);
        const friend = await this.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
        } else {
            user.friends = [ ...user.friends, friendId ];
            friend.friends = [ ...friend.friends, currentUserId ];
        }

        await this.userRepository.save(user);
        await this.userRepository.save(friend);

        return {
            message: true
        }

    }

    public async removeFromFriends(currentUserId: any, friendId: any) {
        const user = await this.findById(currentUserId);
        const friend = await this.findById(friendId);

        delete user.friends[String(friend)];

        await this.userRepository.save(user);
    }

    public async destroy(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    public async getFriendsCount(currentUserId: any) {
        const user = await this.findById(currentUserId);

        return user.friends.length;
    }
    
}