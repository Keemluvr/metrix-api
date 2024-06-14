import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import User from './entities/user.entity';
import Physical from './entities/physical.entity';
import Address from './entities/address.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Address, Physical]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
