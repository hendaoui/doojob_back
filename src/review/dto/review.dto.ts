import { IsNotEmpty } from "class-validator";

export class ReviewDto {
  @IsNotEmpty()
  readonly reviewer: string;

  @IsNotEmpty()
  readonly reviewee: string;
  
  @IsNotEmpty()
  readonly message: string;

  @IsNotEmpty()
  readonly rating: number;
}