import { IsEmail, IsString } from 'class-validator';

export class UserInput {
  @IsEmail()
    email: string;

  @IsString()
    password: string;
}
