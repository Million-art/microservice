import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  likes: number;
}
