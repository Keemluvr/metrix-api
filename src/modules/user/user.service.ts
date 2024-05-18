import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(createUserDto as User, {
      validate: true,
      include: [
        User.associations.address,
        User.associations.contact,
        User.associations.physical,
      ],
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<[number]> {
    return this.userModel.update(updateUserDto as User, { where: { id } });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
