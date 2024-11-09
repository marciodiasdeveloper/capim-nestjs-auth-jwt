import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { SignInUseCase } from './use-cases/sign-in.usecase';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [SignInUseCase, PrismaService],
})
export class LoginModule {}
