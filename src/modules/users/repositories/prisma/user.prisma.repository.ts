import { Injectable } from '@nestjs/common';
import { UsernameAndEmail, UserCreateDTO } from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreateDTO | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }
  async save(data: UserCreateDTO): Promise<UserCreateDTO> {
    return await this.prisma.user.create({ data });
  }

  async findByUsername(username: string): Promise<UserCreateDTO | null> {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}
