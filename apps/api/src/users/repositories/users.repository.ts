import { eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '@/database/database.provider';
import type { IUsersRepository } from './users.interface';
import { type DrizzleDB, type User, user } from '@subtrack/db';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll() {
    return await this.db.query.user.findMany();
  }

  async findById(id: string) {
    return await this.db.query.user.findFirst({
      where: eq(user.id, id),
    });
  }

  async create(data: User) {
    const [newUser] = await this.db.insert(user).values(data).returning();
    return newUser;
  }
}
