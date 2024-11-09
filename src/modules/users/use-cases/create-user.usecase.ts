import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const user = await this.userRepository.findByUsernameOrEmail({
      username: data.username,
      email: data.email,
    });

    // await this.prisma.user.findFirst({
    //   where: {
    //     OR: [{ username: data.username }, { email: data.email }],
    //   },
    // });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(data.password, 10);

    return await this.userRepository.save({ ...data, password });
  }
}
