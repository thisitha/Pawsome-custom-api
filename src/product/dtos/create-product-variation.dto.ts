import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class ProductVariationDto {
  @ApiProperty({
    description: 'The size of the product variation',
    example: 'Medium',
  })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({
    description: 'The color of the product variation',
    example: 'Red',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'The material of the product variation',
    example: 'Cotton',
  })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiProperty({
    description: 'The price of the product variation',
    example: 29.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The quantity available in stock', example: 50 })
  @IsNumber()
  stockQuantity: number;

  @ApiProperty({
    description: 'The SKU (stock-keeping unit) of the product variation',
    example: 'SKU12345',
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({
    description: 'The image URL for the product variation',
    example: 'http://example.com/variation-image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The weight of the product variation in grams',
    example: 250,
  })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({
    description: 'Indicates if the product variation is active for sale',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'The ID of the associated product',
    example: 'product-id',
  })
  @IsUUID()
  productId: string;
}
