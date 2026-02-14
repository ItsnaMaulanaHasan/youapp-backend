import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  displayName: string;

  @IsEnum(['Male', 'Female'])
  gender: string;

  @IsDateString()
  birthday: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsArray()
  interests: string[];
}
