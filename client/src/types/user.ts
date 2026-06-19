export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserDTO = Pick<User, "email" | "name">;

export type UpdateUserDTO = Partial<CreateUserDTO>;
