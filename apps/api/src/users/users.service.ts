import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  type IUsersRepository,
} from './repositories/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepo: IUsersRepository,
  ) {}

  async getAllUsers() {
    return this.usersRepo.findAll();
  }

  async getUserById(id: string) {
    return this.usersRepo.findById(id);
  }
}
