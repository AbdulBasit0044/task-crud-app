import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTaskDto {
    @IsEmail()
    email: string;

    @IsNumberString()
    age: number;
}