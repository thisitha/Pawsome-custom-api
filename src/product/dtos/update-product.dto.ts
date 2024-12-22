import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Apple',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Fresh red apples',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 2.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'The quantity available in stock',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stockQuantity?: number;

  @ApiProperty({
    description: 'The image URL of the product',
    example: 'http://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The weight of the product (in grams)',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({
    description: 'The expiration date of the product',
    example: '2025-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @ApiProperty({
    description: 'Indicates if the product is active for sale',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Category ID for the product', required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: string;

  @ApiProperty({ description: 'Product Group ID', required: false })
  @IsOptional()
  @IsNumber()
  productGroupId?: string;

  @ApiProperty({ description: 'Manufacturer ID', required: false })
  @IsOptional()
  @IsNumber()
  manufacturerId?: string;

  @ApiProperty({ description: 'Product Tag ID', required: false })
  @IsOptional()
  @IsNumber()
  productTagId?: string;

  @ApiProperty({ description: 'Shop ID for the product', required: false })
  @IsOptional()
  @IsNumber()
  shopId?: string;
}
