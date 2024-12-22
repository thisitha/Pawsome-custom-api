import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariationDto } from '../dtos/create-product-variation.dto';
import { ProductVariation } from '../entities/product-variation.entity';
import { Product } from '../entities/product.entity';
import { UpdateProductVariationDto } from '../dtos/update-product-variation.dto';

@Injectable()
export class ProductVariationService {
  constructor(
    @InjectRepository(ProductVariation)
    private readonly productVariationRepository: Repository<ProductVariation>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Create a new product variation
  async createVariation(
    productVariationDto: ProductVariationDto,
  ): Promise<ProductVariation> {
    const { productId, ...variationData } = productVariationDto;

    // Check if the product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const variation = this.productVariationRepository.create({
      ...variationData,
      product,
    });

    return this.productVariationRepository.save(variation);
  }

  async updateVariation(
    id: string,
    updateProductVariationDto: UpdateProductVariationDto,
  ): Promise<ProductVariation> {
    const variation = await this.productVariationRepository.findOne({
      where: { id },
    });
    if (!variation) {
      throw new NotFoundException(`Product Variation with ID ${id} not found`);
    }

    // Only update the fields in the DTO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...updateData } = updateProductVariationDto;

    // Update the variation with the new data
    Object.assign(variation, updateData);

    return this.productVariationRepository.save(variation);
  }

  // Delete a product variation
  async deleteVariation(id: string): Promise<void> {
    const variation = await this.productVariationRepository.findOne({
      where: { id },
    });
    if (!variation) {
      throw new NotFoundException(`Product Variation with ID ${id} not found`);
    }

    await this.productVariationRepository.remove(variation);
  }

  // Find all variations for a specific product
  async findAllByProductId(productId: string): Promise<ProductVariation[]> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.productVariationRepository.find({ where: { product } });
  }
}
