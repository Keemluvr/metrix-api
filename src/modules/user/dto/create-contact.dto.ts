import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { NON_NUMERIC_REGEX, PHONE_REGEX } from 'src/common/constants/regex';

export class CreateContactDTO {
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
}
