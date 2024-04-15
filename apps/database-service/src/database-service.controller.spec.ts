import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseServiceController } from './database-service.controller';
import { DatabaseServiceService } from './database-service.service';
import { MessagesModule } from './modules/messages/messages.module';

describe('DatabaseServiceController', () => {
  let databaseServiceController: DatabaseServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MessagesModule],
      controllers: [DatabaseServiceController],
      providers: [DatabaseServiceService],
    }).compile();

    databaseServiceController = app.get<DatabaseServiceController>(
      DatabaseServiceController,
    );
  });

  describe('root', () => {
    it.skip('should return "Hello World!"', () => {
      expect(databaseServiceController.getHello()).toBe('Hello World!');
    });
  });
});
