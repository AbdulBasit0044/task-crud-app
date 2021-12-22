import { TasksRepository } from './tasks.repository';
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from "./dto/update-task.dto";

import { Task } from "./schemas/tasks.schema";
@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTaskById(taskId: string): Promise<Task> {
    return this.tasksRepository.findOne({ taskId });
  }

  async getTasks(): Promise<Task[]> {
    return this.tasksRepository.find({});
  }

  async createTask(email: string, age: number): Promise<Task> {
    return this.tasksRepository.create({
      taskId: uuidv4(),
      email,
      age,
      favoriteFoods: [],
    });
  }

  async updateTask(taskId: string, taskUpdates: UpdateTaskDto): Promise<Task> {
    return this.tasksRepository.findOneAndUpdate({ taskId }, taskUpdates);
  }
}
