// describe('User Controller', () => {
//   it('should be able to create a new user', async () => {
//     expect(1).toBe(1);
//   });
// });

import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateUserUseCase } from '../use-cases/create-user.usecase';
import { IUserRepository } from '../repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ProfileUserUseCase } from '../use-cases/profile-user.usecase';
import { UploadAvatarUserUseCase } from '../use-cases/upload-avatar-user.usecase';
import { IStorage } from '../../../infra/providers/storage/storage';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from '../dto/user.dto';

describe('User Controller', () => {
  let userController: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        ProfileUserUseCase,
        UploadAvatarUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByUsernameOrEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: IStorage,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('should be able to create a new user', async () => {
    const body: CreateUserDTO = {
      email: 'email@test.com',
      name: 'name_test',
      username: 'username_test',
      password: '12345',
    };

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      ...body,
      id: randomUUID(),
      createdAt: new Date(),
      username: body.username,
      password: body.password,
      email: body.email,
      name: body.name,
    });

    const result = await userController.create(body);
    console.log({ result });
    expect(result).toHaveProperty('username');
  });
});
