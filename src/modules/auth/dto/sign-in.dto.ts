import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class SignInDTO extends PickType(CreateUserDto, ['email', 'password']) {}
