import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { USER_BLOOD_TYPE } from '../enums/user-blood-type.enum';

export class CreatePhysicalDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsEnum(USER_BLOOD_TYPE)
  bloodType: string;

  @IsOptional()
  @IsNumber()
  userId: number;
}
