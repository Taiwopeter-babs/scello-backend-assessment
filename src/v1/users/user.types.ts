import { RequestQuery } from "@src/shared";

export type UserCreate = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "User" | "Admin";
};

export type UserUpdate = Partial<{
  firstName: string;
  lastName: string;
  role: string;
}>;

export type IUser = Omit<UserCreate, "password"> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
};

export type UserQuery = RequestQuery & {
  name?: string;
};

export type GetUserParams =
  | { by: "id"; value: number; includePssword?: boolean }
  | { by: "email"; value: string; includePssword?: boolean };
