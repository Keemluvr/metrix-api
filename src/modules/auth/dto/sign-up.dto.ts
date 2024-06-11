import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

export class SignUpDTO extends PickType(CreateUserDto, ['name', 'email']) {
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
