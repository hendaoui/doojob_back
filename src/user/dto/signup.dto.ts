import { IsNotEmpty } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly phoneNumber: number;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}