import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateProductVariationDto {
  @ApiProperty({
    description: 'The size of the product variation',
    example: 'Large',
    required: false,
  })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({
    description: 'The color of the product variation',
    example: 'Blue',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'The material of the product variation',
    example: 'Leather',
    required: false,
  })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiProperty({
    description: 'The price of the product variation',
    example: 39.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'The quantity available in stock',
    example: 150,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stockQuantity?: number;

  @ApiProperty({
    description: 'The SKU (stock-keeping unit) of the product variation',
    example: 'SKU67890',
    required: false,
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({
    description: 'The image URL for the product variation',
    example: 'http://example.com/variation-image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The weight of the product variation in grams',
    example: 300,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({
    description: 'Indicates if the product variation is active for sale',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
