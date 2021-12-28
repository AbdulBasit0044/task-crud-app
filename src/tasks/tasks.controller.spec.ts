import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './schemas/tasks.schema';

// jest.mock('./tasks.service');

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
    find: jest.fn(() => {
      return [];
    }),
    findOneAndUpdate: jest.fn((taskId, dto) => {
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

  it('should create a task!', async () => {
    let actual: Task;
    try {
      actual = await tasksController.createTask({
        email: 'testing123344@gmail.com',
        age: 22,
      });
    } catch (err) {
      console.log(err);
    }
    expect(actual).toEqual({
      taskId: expect.any(String),
      favoriteFoods: [],
      age: 22,
      email: 'testing123344@gmail.com',
    });
  });

  it('should not create a user!', async () => {
    let actual: Task;
    try {
      actual = await tasksController.createTask({
        email: 'testing123344@gmail.com',
        age: 22,
      });
    } catch (err) {
      console.log(err);
    }
    expect(actual).not.toEqual({
      taskId: expect.any(String),
      favoriteFoods: [],
      age: 23,
      email: 'testing123344@gmail.com',
    });
  });


  it('should getAll users!', async () => {
    let actual: Task[];
    try {
      actual = await tasksController.getTasks();
    } catch (err) {
      console.log(err);
    }
    expect(actual).toEqual([]);
  });

  it('should update the task!', async () => {
    let actual: Task;
    try {
      const taskId = uuidv4();
      const dto = {
        favoriteFoods: ['zzz', 'aaa'],
        age: 222,
      };
      actual = await tasksController.updateTask(taskId, dto);
    } catch (err) {
      console.log(err);
    }
    expect(actual).toEqual({
      taskId: expect.any(String),
      favoriteFoods: ['zzz', 'aaa'],
      age: 222,
    });
  });

  it('should update the task!', async () => {
    let actual: Task;
    try {
      const taskId = uuidv4();
      const dto = {
        favoriteFoods: ['zzz', 'aaa'],
        age: 222,
      };
      actual = await tasksController.updateTask(taskId, dto);
    } catch (err) {
      console.log(err);
    }
    expect(actual).not.toEqual({
      taskId: expect.any(String),
      favoriteFoods: ['aaa', 'aaa'],
      age: 111,
    });
  });

  it('calling getTasks method', () => {
    const getTasksSpy = jest.spyOn(tasksController, 'getTasks');
    tasksController.getTasks();
    expect(getTasksSpy).toHaveBeenCalledWith();
  });
});
