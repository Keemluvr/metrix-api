import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  Matches,
  IsOptional,
  ValidateNested,
  Length,
  IsISO8601,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { USER_GENDER } from '../enums/user-gender.enum';
import { USER_ZODIAC_SIGN } from '../enums/user-zodiac-sign.enum';
import {
  CPF_REGEX,
  RG_REGEX,
  NON_NUMERIC_REGEX,
  PHONE_REGEX,
} from 'src/common/constants/regex';
import { CreateAddressDTO as Address } from './create-address.dto';
import { CreatePhysicalDTO as Physical } from './create-physical.dto';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 14)
  @Matches(CPF_REGEX)
  @Transform(({ value }) => value.replace(NON_NUMERIC_REGEX, ''), {
    toClassOnly: true,
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @Matches(RG_REGEX)
  @Length(8, 12)
  @Transform(({ value }) => value.replace(NON_NUMERIC_REGEX, ''), {
    toClassOnly: true,
  })
  rg: string;

  @IsNotEmpty()
  @IsISO8601()
  birthdate: string;

  @IsNotEmpty()
  @IsEnum(USER_GENDER)
  gender: string;

  @IsNotEmpty()
  @IsEnum(USER_ZODIAC_SIGN)
  zodiacSign: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(PHONE_REGEX)
  @Transform(({ value }) => value.replace(NON_NUMERIC_REGEX, ''), {
    toClassOnly: true,
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Matches(PHONE_REGEX)
  @Transform(({ value }) => value.replace(NON_NUMERIC_REGEX, ''), {
    toClassOnly: true,
  })
  cellphone: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  motherName: string;

  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @IsOptional()
  @ValidateNested()
  address?: Address;

  @IsOptional()
  @ValidateNested()
  physical?: Physical;
}
