import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';
import { ProductVariationDto } from './create-product-variation.dto';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Apple' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Fresh red apples',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The price of the product', example: 2.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The quantity available in stock', example: 100 })
  @IsNumber()
  stockQuantity: number;

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

  @ApiProperty({ description: 'Category ID for the product' })
  @IsNumber()
  categoryId: string;

  @ApiProperty({ description: 'Product Group ID' })
  @IsNumber()
  productGroupId: string;

  @ApiProperty({ description: 'Manufacturer ID' })
  @IsNumber()
  manufacturerId: string;

  @ApiProperty({ description: 'Product Tag ID' })
  @IsNumber()
  productTagId: string;

  @ApiProperty({ description: 'Shop ID for the product' })
  @IsNumber()
  shopId: string;

  @ApiProperty({
    description: 'The variations of the product',
    type: [ProductVariationDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  variations?: ProductVariationDto[];
}
