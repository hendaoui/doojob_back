import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateIssueDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  readonly photo1: string;

  readonly photo2: string;

  readonly photo3: string;

  @IsNotEmpty()
  @IsEmail()
  readonly author: string;

  @IsEmail()
  readonly assignee: string;

  @IsNotEmpty()
  readonly location: object;
}