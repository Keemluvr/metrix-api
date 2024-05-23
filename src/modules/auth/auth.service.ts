import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signin(SignInDTO: SignInDTO) {
    const user = (await this.validateUser(SignInDTO)).dataValues;
    const token = await this.generateToken(user);

    delete user.password;

    return { ...user, ...token };
  }

  async signup(signUpDTO: SignUpDTO) {
    try {
      const alreadyExistsUser = await this.userService.getByEmail(
        signUpDTO.email,
      );

      if (alreadyExistsUser)
        throw new ConflictException({
          entity: 'account',
          message: 'field-already-exist',
        });

      const user = await this.userService.createDefault(signUpDTO as User);

      return this.generateToken(user);
    } catch (error) {
      console.log(error);
    }
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto) {
    const user = await this.userService.getByEmail(userDto.email);

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) return user;

    throw new UnauthorizedException({ message: 'Unauthorized' });
  }
}
