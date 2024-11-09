import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInUseCase } from './use-cases/sign-in.usecase';

@Controller()
export class LoginController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/sign-in')
  async signIn(@Body() signInDTO: SignInDTO) {
    return await this.signInUseCase.execute(signInDTO);
  }
}
