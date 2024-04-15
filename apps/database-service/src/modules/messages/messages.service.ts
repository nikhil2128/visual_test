import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(userId: string, content: string) {
    return await this.messagesRepository.save({
      content: content,
      userId: userId,
    });
  }

  async findAll(userId: string) {
    return await this.messagesRepository.findBy({
      userId: userId,
    });
  }
}
