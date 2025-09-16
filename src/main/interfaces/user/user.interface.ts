export interface UserI {
  id: number;
  name: string;
  last_name: string;
  dni: string;
  email: string;
  password: string;
  role: UserRoles;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum UserRoles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
}

export interface LoginI {
  email: string;
  password: string;
}

export interface CreateAminUserI {
  name: string;
  last_name: string;
  dni: string;
  email: string;
  password: string;
}
