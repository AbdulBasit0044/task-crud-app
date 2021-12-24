import { taskStub } from '../test/stubs/task.stub';

export const TaskService = jest.fn().mockReturnValue({
  getTaskById: jest.fn().mockResolvedValue(taskStub()),
  getTasks: jest.fn().mockResolvedValue([taskStub()]),
  createTask: jest.fn().mockResolvedValue(taskStub()),
  updateTask: jest.fn().mockResolvedValue(taskStub()),
});
