import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CEP_REGEX, NON_NUMERIC_REGEX } from '../../../common/constants/regex';
import { BR_STATES } from '../enums/address-state.enum';

export class CreateAddressDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(CEP_REGEX)
  @Transform(({ value }) => value.replace(NON_NUMERIC_REGEX, ''), {
    toClassOnly: true,
  })
  cep: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @IsEnum(BR_STATES)
  state: string;

  @IsOptional()
  @IsNumber()
  userId: number;
}
