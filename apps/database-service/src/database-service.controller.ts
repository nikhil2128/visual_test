import { Controller, Get } from '@nestjs/common';
import { DatabaseServiceService } from './database-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagesService } from './modules/messages/messages.service';

@Controller()
export class DatabaseServiceController {
  constructor(
    private readonly databaseServiceService: DatabaseServiceService,
    private readonly messagesService: MessagesService,
  ) {}

  @Get()
  getHello(): string {
    return this.databaseServiceService.getHello();
  }

  @MessagePattern('user.message')
  async handleMessageAction(
    @Payload() message: { action: string; userId: string; content?: string },
  ) {
    switch (message.action) {
      case 'read': {
        return await this.messagesService.findAll(message.userId);
      }

      case 'create': {
        return await this.messagesService.create(
          message.userId,
          message.content,
        );
      }
    }
  }
}
