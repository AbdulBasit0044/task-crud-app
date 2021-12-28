import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';

describe('TasksService', () => {
  let service: TasksService;
  const mockTasksRepository = {
    create: jest.fn((dto) => {
      return {
        taskId: uuidv4(),
        ...dto,
      };
    }),
    find: jest.fn(() => []),
    findOneAndUpdate: jest.fn((taskId, dto) => {
      return {
        taskId: uuidv4(),
        ...dto,
      };
    }),
    findOne: jest.fn(() => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should call createTask method', () => {
    const dto = new CreateTaskDto();
    const createTaskSpy = jest.spyOn(service, 'createTask');
    service.createTask(dto);
    expect(createTaskSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getTasks method with expected param', () => {
    const getTasksSpy = jest.spyOn(service, 'getTasks');
    service.getTasks();
    expect(getTasksSpy).toHaveBeenCalledWith();
  });

  it('should call findOneTask method with expected param', () => {
    const findOneTaskSpy = jest.spyOn(service, 'getTaskById');
    const taskId: string = '';
    service.getTaskById(taskId);
    expect(findOneTaskSpy).toHaveBeenCalledWith(taskId);
  });

  it('should call updateTask method with expected params', () => {
    const updateTaskSpy = jest.spyOn(service, 'updateTask');
    const taskId = 'taskId';
    const dto = new UpdateTaskDto();
    service.updateTask(taskId, dto);
    expect(updateTaskSpy).toHaveBeenCalledWith(taskId, dto);
  });
});
