import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDTO } from '../auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findByPk(id, {
      include: [User.associations.address, User.associations.physical],
    });
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository
      .scope('withPassword')
      .findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto as User, {
      validate: true,
      include: [User.associations.address, User.associations.physical],
    });
  }

  async createDefault(createUserDto: SignUpDTO): Promise<User> {
    return this.userRepository.create(createUserDto as User);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<[number]> {
    return this.userRepository.update(updateUserDto as User, { where: { id } });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (!user)
      throw new NotFoundException({
        entity: 'user',
        message: 'field-not-found',
      });

    await user.destroy();
  }
}
