import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CEP_REGEX, NON_NUMERIC_REGEX } from 'src/common/constants/regex';
import { BR_STATES } from '../enums/address-state.enum';

export class CreateAddressDTO {
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
}
