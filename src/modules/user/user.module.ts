import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Address, Contact])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
