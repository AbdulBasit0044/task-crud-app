import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTaskDto {
    @IsNotEmpty()
    favoriteFoods: string[]

    @IsNumber()
    age: number;
}