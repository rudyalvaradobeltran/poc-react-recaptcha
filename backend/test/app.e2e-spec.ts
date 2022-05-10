import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/data/save (POST)', () => {
    const payload = { name: 'John Doe' };
    return request(app.getHttpServer())
      .post('/data/save')
      .send(payload)
      .expect(201)
      .expect(payload.name);
  });
});
