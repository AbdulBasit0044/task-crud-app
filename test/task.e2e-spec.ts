import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import supertest from 'supertest';
import * as request from 'supertest';
import { TasksModule } from '../src/tasks/tasks.module';
import { TasksService } from '../src/tasks/tasks.service';
import { TasksRepository } from '../src/tasks/tasks.repository';
import { AppModule } from '../src/app.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  //   let request: () => supertest.SuperTest<supertest.Test>;
  const mockTasksRepository = {};
  let server: any;

  beforeAll(async () => {
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
    server = app.getHttpServer();
    await app.init();
    // request = () => supertest(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(server).get('/tasks').expect(200);
  });

  it('/ (GET)', () => {
    return request(server).get('/taskss').expect(404);
  });

  it('/ (GETBYID)', async () => {
    const id = await request(server)
      .post('/tasks')
      .send({
        email: 'testForPostAndGetById@gmail.com',
        age: '123456',
      })
      .then((resp) => resp.body.taskId);
    return request(server).get(`/tasks/${id}`).expect(200);
  });

  it('/ (POST)', () => {
    return request(server)
      .post('/tasks')
      .send({
        email: 'emailValidatorIsWorkingggg@gmail.com',
        age: '111',
      })
      .expect(201);
  });
});
