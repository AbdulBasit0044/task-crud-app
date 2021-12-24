import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { v4 as uuidv4 } from 'uuid';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        taskId: uuidv4(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: mockUserService,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  it('should create a user!', async () => {
    try {
      var actual = await tasksController.createTask({
        email: 'testing123@gmail.com',
        age: 22,
      });
      console.log('actual isss', actual);
    } catch (err) {
      console.log(err);
    }
    expect(actual).toEqual({
      taskId: expect.any(String),
      favoriteFoods: [],
      age: 22,
      email: 'testing123@gmail.com',
    });
  });
});
