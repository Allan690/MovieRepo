import {
  IsInt,
  IsString,
  IsUrl,
  Length, Max,
} from 'class-validator';

export class MovieInput {
  @IsUrl()
    image: string;
  @IsString()
  @Length(3)
    summary: string;

  @IsString()
  @Length(3)
    name: string;

  @IsInt()
  @Max(2025)
    year: string;
}
