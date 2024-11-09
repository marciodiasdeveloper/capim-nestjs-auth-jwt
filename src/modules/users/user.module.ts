import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { IUserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase, PrismaService. {
    provide: IUserRepository,
    useClass: UserPrismaRepository,
  }],
})
export class UserModule {}
