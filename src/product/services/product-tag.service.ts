import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Repository } from 'typeorm';
import { ProductTag } from '../entities/product-tag.entity';

@Injectable()
export class ProductTagService {
  constructor(
    @InjectRepository(ProductTag)
    private productTagRepository: Repository<ProductTag>,

    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  // Fetch all product tags based on the user's shop
  async getAllProductTags(user: User): Promise<ProductTag[]> {
    if (user.role === 'super_admin') {
      return this.productTagRepository.find();
    }

    // Get the shop associated with the current user
    const shop = await this.shopRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }

    // Fetch product tags associated with the shop
    return this.productTagRepository.find({
      where: { shop: shop },
    });
  }

  // Fetch a product tag by ID
  async getProductTagById(user: User, id: string): Promise<ProductTag> {
    const productTag = await this.productTagRepository.findOne({
      where: { id },
      relations: ['shop'], // Include shop relation
    });

    if (!productTag) {
      throw new NotFoundException('Product Tag not found');
    }

    if (user.role !== 'super_admin' && productTag.shop.user.id !== user.id) {
      throw new NotFoundException(
        'You do not have permission to access this product tag',
      );
    }

    return productTag;
  }

  // Create a new product tag and associate it with the user's shop
  async createProductTag(user: User, name: string): Promise<ProductTag> {
    let shop = null;
    if (user.role !== 'super_admin') {
      shop = await this.shopRepository.findOne({
        where: { user: { id: user.id } },
      });

      if (!shop) {
        throw new NotFoundException('Shop not found for this user');
      }
    }

    const productTag = this.productTagRepository.create({
      name,
      shop: shop,
    });

    return this.productTagRepository.save(productTag);
  }

  // Update an existing product tag
  async updateProductTag(
    user: User,
    id: string,
    name?: string,
  ): Promise<ProductTag> {
    const productTag = await this.getProductTagById(user, id);

    productTag.name = name ?? productTag.name;

    return this.productTagRepository.save(productTag);
  }

  // Delete a product tag
  async deleteProductTag(user: User, id: string): Promise<void> {
    const productTag = await this.getProductTagById(user, id);

    await this.productTagRepository.remove(productTag);
  }
}
