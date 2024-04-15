import { Module } from '@nestjs/common';
import { ApiServiceController } from './api-service.controller';
import { ApiServiceService } from './api-service.service';
import { MessagesModule } from './modules/messages/messages.module';
import { UsersService } from './modules/users/users.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MessagesModule,
    ClientsModule.register([
      {
        name: 'VISUALIZY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'app-gateway',
            brokers: [process.env.KAFKA_HOST],
          },
          consumer: {
            groupId: process.env.KAFKA_GROUP,
          },
        },
      },
    ]),
  ],
  controllers: [ApiServiceController],
  providers: [ApiServiceService, UsersService],
})
export class ApiServiceModule {}
