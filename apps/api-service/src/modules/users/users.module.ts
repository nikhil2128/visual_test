import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JwtStrategy } from '../../shared/providers/jwt.strategy';
import { UsersService } from './users.service';

dotenv.config();

@Module({
  imports: [],
  controllers: [],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
