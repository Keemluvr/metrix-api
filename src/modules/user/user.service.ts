import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDTO } from '../auth/dto/sign-up.dto';
import { Address } from './entities/address.entity';
import { Physical } from './entities/physical.entity';
import { Transactional } from 'sequelize-transactional-decorator';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Address) private addressRepository: typeof Address,
    @InjectModel(Physical) private physicalRepository: typeof Physical,
  ) {}

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

  private async validateUserExists(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (!user)
      throw new NotFoundException({
        entity: 'user',
        message: 'field-not-found',
        ok: false,
      });
  }

  private async validateUniqueFieldsById(
    id: number,
    user: User,
  ): Promise<void> {
    const { cpf, rg, email } = user;

    const existUserWithField = await User.findOne({
      where: {
        [Op.or]: [{ cpf }, { email }, { rg }],
        [Op.not]: [{ id }],
      },
    });

    if (existUserWithField)
      throw new ConflictException({
        entity: 'user',
        message: 'already-exist-property-for-another-user',
        ok: false,
      });
  }

  private async validateUniqueFields(user: User): Promise<void> {
    const { cpf, rg, email } = user;

    const existUserWithField = await User.findOne({
      where: { [Op.or]: [{ cpf }, { email }, { rg }] },
    });

    if (existUserWithField)
      throw new ConflictException({
        entity: 'user',
        message: 'already-exist-property-for-another-user',
        ok: false,
      });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.validateUniqueFields(createUserDto as User);

    return this.userRepository.create(createUserDto as unknown as User, {
      validate: true,
      include: [User.associations.address, User.associations.physical],
    });
  }

  async createDefault(createUserDto: SignUpDTO): Promise<User> {
    return this.userRepository.create(createUserDto as User);
  }

  @Transactional()
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number] | unknown> {
    const user = await this.findOne(id);

    await this.validateUserExists(id);
    await this.validateUniqueFieldsById(id, updateUserDto as User);

    await this.addressRepository.update(updateUserDto.address, {
      where: { id: user.address.id },
    });

    await this.physicalRepository.update(updateUserDto.physical, {
      where: { id: user.physical.id },
    });

    return this.userRepository.update(updateUserDto as unknown as User, {
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    await this.validateUserExists(id);

    await user.destroy();
  }
}
