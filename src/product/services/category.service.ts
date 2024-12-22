import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}
  async createCategory(
    categoryData: { name: string },
    user: User,
  ): Promise<Category> {
    const shop = await this.shopRepository.findOne({ where: { user: user } });
    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }
    const category = this.categoryRepository.create({ ...categoryData, shop });
    return this.categoryRepository.save(category);
  }

  async getCategoriesForShop(user: User): Promise<Category[]> {
    const shop = await this.shopRepository.findOne({ where: { user: user } });
    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }
    return this.categoryRepository.find({ where: { shop } });
  }

  async getCategoryByIdForShop(id: string, user: User): Promise<Category> {
    const shop = await this.shopRepository.findOne({ where: { user: user } });
    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }
    const category = await this.categoryRepository.findOne({
      where: { id, shop },
    });
    if (!category) {
      throw new NotFoundException('Category not found for this shop');
    }
    return category;
  }

  async deleteCategory(id: string, user: User): Promise<void> {
    const shop = await this.shopRepository.findOne({ where: { user: user } });
    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }
    const category = await this.categoryRepository.findOne({
      where: { id, shop },
    });
    if (!category) {
      throw new NotFoundException('Category not found for this shop');
    }
    await this.categoryRepository.delete(id);
  }
}
