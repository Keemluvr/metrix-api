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
    const user = await this.validateUser(SignInDTO);

    return this.generateToken(user);
  }

  async signup(signUpDTO: SignUpDTO) {
    const alreadyExistsUser = await this.userService.getByEmail(
      signUpDTO.email,
    );

    if (alreadyExistsUser) throw new ConflictException('User already exists');

    const user = await this.userService.create(signUpDTO as User);

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
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
