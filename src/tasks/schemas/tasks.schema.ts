import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  taskId: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop([String])
  favoriteFoods: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
