import { Task } from '../../schemas/tasks.schema';

export const taskStub = (): Task => {
  return {
    taskId: '61c314ab9105442832be194b',
    email: 'test@gmail.com',
    age: 123,
    favoriteFoods: ['asdf', 'ghjk'],
  };
};
