import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from '../src/tasks/tasks.module';
import { TasksService } from '../src/tasks/tasks.service';
import { TasksRepository } from '../src/tasks/tasks.repository';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockTasksRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule, AppModule],
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/tasks').expect(200);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/taskss').expect(404);
  });

  it('/ (GETBYID)', async () => {
    const id = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        email: 'testForPostAndGetById@gmail.com',
        age: '123456',
      })
      .then((resp) => resp.body.taskId);
    return request(app.getHttpServer()).get(`/tasks/${id}`).expect(200);
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        email: 'emailValidatorIsWorkingggg@gmail.com',
        age: '111',
      })
      .expect(201);
  });
});
