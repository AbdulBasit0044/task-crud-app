import { TasksRepository } from './tasks.repository';
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from "./dto/update-task.dto";

import { Task } from "./schemas/tasks.schema";
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getTaskById(taskId: string): Promise<Task> {
    return this.tasksRepository.findOne({ taskId });
  }

  getTasks(): Promise<Task[]> {
    return this.tasksRepository.find({});
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {email, age} = createTaskDto;
    return this.tasksRepository.create({
      taskId: uuidv4(),
      email,
      age,
      favoriteFoods: [],
    });
  }

  updateTask(taskId: string, taskUpdates: UpdateTaskDto): Promise<Task> {
    return this.tasksRepository.findOneAndUpdate({ taskId }, taskUpdates);
  }
}
