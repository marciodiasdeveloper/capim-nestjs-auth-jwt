import {
  CreateUserDTO,
  UserCreateDTO,
  UsernameAndEmail,
} from '../dto/user.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreateDTO | null>;
  abstract save(data: CreateUserDTO): Promise<UserCreateDTO>;
}
