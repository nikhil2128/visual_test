import { NestFactory } from '@nestjs/core';
import { DatabaseServiceModule } from './database-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DatabaseServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `consumer-${uuidv4()}`,
          brokers: [process.env.KAFKA_HOST],
        },
        consumer: {
          groupId: 'consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
