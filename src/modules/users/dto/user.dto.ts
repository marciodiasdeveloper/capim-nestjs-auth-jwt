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

export type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
