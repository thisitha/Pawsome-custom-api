// src/products/dto/filter-product.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class FilterProductDto {
  @ApiProperty({
    description: 'The name of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The price of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'The stock quantity of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stockQuantity?: number;

  @ApiProperty({
    description: 'Indicates if the product is active for sale',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'The expiration date of the product',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @ApiProperty({
    description: 'The category ID for the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({
    description: 'The product group ID for the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  productGroupId?: number;

  @ApiProperty({
    description: 'The manufacturer ID for the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  manufacturerId?: number;
}
