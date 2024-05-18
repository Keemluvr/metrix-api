import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { USER_BLOOD_TYPE } from '../enums/user-blood-type.enum';

export class CreatePhysicalDTO {
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsEnum(USER_BLOOD_TYPE)
  bloodType: string;
}
