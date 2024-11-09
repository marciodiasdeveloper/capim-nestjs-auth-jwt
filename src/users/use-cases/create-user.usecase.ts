export type CreateUserDTO = {
  username: string;
  password: string;
  email: string;
};
export class CreateUserUseCase {
  async execute(data: CreateUserDTO) {}
}
