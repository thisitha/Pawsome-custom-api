import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductGroup } from '../entities/product-group.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductGroupService {
  constructor(
    @InjectRepository(ProductGroup)
    private productGroupRepository: Repository<ProductGroup>,

    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  // Fetch all product groups based on the user's shop
  async getAllProductGroups(user: User): Promise<ProductGroup[]> {
    if (user.role === 'super_admin') {
      return this.productGroupRepository.find();
    }

    // Get the shop associated with the current user
    const shop = await this.shopRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }

    // Fetch product groups associated with the shop
    return this.productGroupRepository.find({
      where: { shop: shop },
    });
  }

  // Fetch a product group by ID
  async getProductGroupById(user: User, id: string): Promise<ProductGroup> {
    const productGroup = await this.productGroupRepository.findOne({
      where: { id },
      relations: ['shop'], // Include shop relation
    });

    if (!productGroup) {
      throw new NotFoundException('Product Group not found');
    }

    if (user.role !== 'super_admin' && productGroup.shop.user.id !== user.id) {
      throw new NotFoundException(
        'You do not have permission to access this product group',
      );
    }

    return productGroup;
  }

  // Create a new product group and associate it with the user's shop
  async createProductGroup(user: User, name: string): Promise<ProductGroup> {
    let shop = null;
    if (user.role !== 'super_admin') {
      shop = await this.shopRepository.findOne({
        where: { user: { id: user.id } },
      });

      if (!shop) {
        throw new NotFoundException('Shop not found for this user');
      }
    }

    const productGroup = this.productGroupRepository.create({
      name,
      shop: shop,
    });

    return this.productGroupRepository.save(productGroup);
  }

  // Update an existing product group
  async updateProductGroup(
    user: User,
    id: string,
    name?: string,
  ): Promise<ProductGroup> {
    const productGroup = await this.getProductGroupById(user, id);

    productGroup.name = name ?? productGroup.name;

    return this.productGroupRepository.save(productGroup);
  }

  // Delete a product group
  async deleteProductGroup(user: User, id: string): Promise<void> {
    const productGroup = await this.getProductGroupById(user, id);

    await this.productGroupRepository.remove(productGroup);
  }
}
