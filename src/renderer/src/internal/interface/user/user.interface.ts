export interface UserI {
  id: number;
  name: string;
  last_name: string;
  dni: string;
  email: string;
  password: string;
  role: UserRoles;
  created_at: Date;
  updated_at: Date | null;
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
