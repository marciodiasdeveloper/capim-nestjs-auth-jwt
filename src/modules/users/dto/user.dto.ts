export type CreateUserDTO = {
  username: string;
  password: string;
  email: string;
  name: string;
};

export type UserCreateDTO = {
  id: string;
  createdAt: Date;
} & CreateUserDTO;

export type UsernameAndEmail = {
  email: string;
  username: string;
};
