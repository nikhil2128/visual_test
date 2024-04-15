import { Module } from '@nestjs/common';
import { DatabaseServiceController } from './database-service.controller';
import { DatabaseServiceService } from './database-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './modules/messages/messages.module';
import { Message } from './modules/messages/entities/message.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dbEntities = [Message];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: dbEntities,
      synchronize: true,
      multipleStatements: true,
      timezone: 'Z',
      charset: 'utf8mb4_unicode_ci',
    }),
    MessagesModule,
  ],
  controllers: [DatabaseServiceController],
  providers: [DatabaseServiceService],
})
export class DatabaseServiceModule {}
