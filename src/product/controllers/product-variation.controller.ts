import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
} from '@nestjs/common';
import { ProductVariationDto } from '../dtos/create-product-variation.dto';
import { UpdateProductVariationDto } from '../dtos/update-product-variation.dto';
import { ProductVariationService } from '../services/product-variation.service';

@Controller('product-variations')
export class ProductVariationController {
  constructor(
    private readonly productVariationService: ProductVariationService,
  ) {}

  @Post()
  async create(@Body() productVariationDto: ProductVariationDto) {
    return this.productVariationService.createVariation(productVariationDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductVariationDto: UpdateProductVariationDto,
  ) {
    return this.productVariationService.updateVariation(
      id,
      updateProductVariationDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productVariationService.deleteVariation(id);
  }

  @Get('product/:productId')
  async findByProductId(@Param('productId') productId: string) {
    return this.productVariationService.findAllByProductId(productId);
  }
}
