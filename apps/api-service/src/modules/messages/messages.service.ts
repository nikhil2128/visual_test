import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MessagesService implements OnModuleInit {
  @Client({
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
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('user.message');

    const kafka = new Kafka({
      clientId: 'app-gateway',
      brokers: [process.env.KAFKA_HOST],
    });

    const admin = kafka.admin();
    const topics = await admin.listTopics();
    console.log(topics);
    const topicList = [];
    if (!topics.includes('user.message')) {
      topicList.push({
        topic: 'user.message',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (!topics.includes('user.message.reply')) {
      topicList.push({
        topic: 'user.message.reply',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (topicList.length) {
      await admin.createTopics({
        topics: topicList,
      });
    }
  }

  async create(userId: string, createMessageDto: CreateMessageDto) {
    return await this.storeUserMessage(createMessageDto.content, userId);
  }

  private storeUserMessage(content: string, userId: string) {
    return new Promise((resolve) => {
      this.client
        .send(
          'user.message',
          JSON.stringify({
            content: content,
            userId: userId,
            action: 'create',
          }),
        )
        .subscribe((result: any) => {
          resolve(result);
        });
    });
  }

  findAll(userId: string) {
    return new Promise((resolve) => {
      this.client
        .send(
          'user.message',
          JSON.stringify({ userId: userId, action: 'read' }),
        )
        .subscribe((result: any) => {
          resolve(result);
        });
    });
  }
}
