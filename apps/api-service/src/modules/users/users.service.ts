import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findOne(userId: string) {
    return {
      id: userId,
    };
  }
}
