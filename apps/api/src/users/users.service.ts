import { Injectable } from '@nestjs/common';
import { db } from '@subtrack/db';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return db.query.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
