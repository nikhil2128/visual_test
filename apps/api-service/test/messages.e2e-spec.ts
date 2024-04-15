import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MessagesModule } from '../src/modules/messages/messages.module';
import { ApiServiceModule } from '../src/api-service.module';

describe('MessagesServiceController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiServiceModule, MessagesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/messages (POST) without authorization token', () => {
    return request(app.getHttpServer()).post('/messages').expect(401);
  });

  it('/messages (POST)', () => {
    return request(app.getHttpServer())
      .post('/messages')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkdW1teV91c2VySWQiLCJpYXQiOjE3MTMxNzYzMjksImV4cCI6MTcyMDk1MjMyOX0.1jQ0Qm7Bnp3z9s2pQN5msoBQuPk-jZJl1KC0QfulZFo',
      )
      .send({
        content: 'message 1',
      })
      .expect(201);
  });

  it('/messages (GET) without token', () => {
    return request(app.getHttpServer()).get('/messages').expect(401);
  });

  it('/messages (GET)', () => {
    return request(app.getHttpServer())
      .get('/messages')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkdW1teV91c2VySWQiLCJpYXQiOjE3MTMxNzYzMjksImV4cCI6MTcyMDk1MjMyOX0.1jQ0Qm7Bnp3z9s2pQN5msoBQuPk-jZJl1KC0QfulZFo',
      )
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
