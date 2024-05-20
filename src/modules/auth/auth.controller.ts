import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signin(signInDTO);
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signup(signUpDto);
  }
}
