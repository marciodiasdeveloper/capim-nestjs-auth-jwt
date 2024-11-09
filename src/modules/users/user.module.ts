import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { ProfileUserUseCase } from './use-cases/profile-user.usecase';
import { UploadAvatarUserUseCase } from './use-cases/upload-avatar-user.usecase';
import { IStorage } from '../../infra/providers/storage/storage';
import { SupabaseStorage } from '../../infra/providers/storage/supabase.storage';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ProfileUserUseCase,
    UploadAvatarUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class UserModule {}
