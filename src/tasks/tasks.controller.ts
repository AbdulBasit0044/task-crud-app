import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/tasks.schema';
import { TasksService } from './tasks.service';

//CanRemoveThisOK

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.getTaskById(taskId);
  }

  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':taskId')
  updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }
}
