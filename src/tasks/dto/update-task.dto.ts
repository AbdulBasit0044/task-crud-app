import { IsArray, IsNumber } from 'class-validator';

export class UpdateTaskDto {
    @IsArray()
    favoriteFoods: string[]

    @IsNumber()
    age: number;
}