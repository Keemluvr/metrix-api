import { Address } from '../entities/address.entity';

export class CreateUserDto {
  name: string;
  age: number;
  cpf: string;
  rg: string;
  birthdate: Date;
  gender: string;
  zodiacSign: string;
  email: string;
  motherName: string;
  fatherName: string;
  address?: Address;
}
