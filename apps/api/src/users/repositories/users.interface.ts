import type { User } from '@subtrack/db';

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
}

// Token para la inyección de dependencias
export const USERS_REPOSITORY = 'USERS_REPOSITORY';
