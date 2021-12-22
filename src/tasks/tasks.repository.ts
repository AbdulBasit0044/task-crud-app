import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Task, TaskDocument } from "./schemas/tasks.schema";

@Injectable()
export class TasksRepository {
    constructor(@InjectModel(Task.name) private tasksModel: Model<TaskDocument>) {}

    async findOne(tasksFilterQuery: FilterQuery<Task>): Promise<Task> {
        return this.tasksModel.findOne(tasksFilterQuery);
    }

    async find(taskssFilterQuery: FilterQuery<Task>): Promise<Task[]> {
        return this.tasksModel.find(taskssFilterQuery)
    }

    async create(tasks: Task): Promise<Task> {
        const newTasks = new this.tasksModel(tasks);
        return newTasks.save()
    }

    async findOneAndUpdate(tasksFilterQuery: FilterQuery<Task>, tasks: Partial<Task>): Promise<Task> {
        return this.tasksModel.findOneAndUpdate(tasksFilterQuery, tasks, { new: true });
    }
}