import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Category } from './entities/category.entity';
import { Manufacturer } from './entities/manufacturer.entity';
import { ProductGroup } from './entities/product-group.entity';
import { ProductTag } from './entities/product-tag.entity';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dtos/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(ProductGroup)
    private productGroupRepository: Repository<ProductGroup>,

    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,

    @InjectRepository(ProductTag)
    private productTagRepository: Repository<ProductTag>,
  ) {}

  // Get all products based on the user's shop
  async getAllProducts(user: User): Promise<Product[]> {
    if (user.role === 'super_admin') {
      return this.productRepository.find();
    }

    const shop = await this.shopRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }

    return this.productRepository.find({
      where: { shop: shop },
    });
  }

  // Get product by ID
  async getProductById(user: User, id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['shop'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (user.role !== 'super_admin' && product.shop.user.id !== user.id) {
      throw new NotFoundException(
        'You do not have permission to access this product',
      );
    }

    return product;
  }

  // Create a new product
  async createProduct(
    user: User,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    let shop = null;
    if (user.role !== 'super_admin') {
      shop = await this.shopRepository.findOne({
        where: { user: { id: user.id } },
      });

      if (!shop) {
        throw new NotFoundException('Shop not found for this user');
      }
    }

    const {
      categoryId,
      productGroupId,
      manufacturerId,
      productTagId,
      ...rest
    } = createProductDto;

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    const productGroup = await this.productGroupRepository.findOne({
      where: { id: productGroupId },
    });
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: manufacturerId },
    });
    const productTag = await this.productTagRepository.findOne({
      where: { id: productTagId },
    });

    const product = this.productRepository.create({
      ...rest,
      shop,
      category,
      productGroup,
      manufacturer,
      productTag,
    });

    return this.productRepository.save(product);
  }

  // Update an existing product
  async updateProduct(
    user: User,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getProductById(user, id);

    const {
      categoryId,
      productGroupId,
      manufacturerId,
      productTagId,
      ...updateData
    } = updateProductDto;

    if (categoryId) {
      product.category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
    }
    if (productGroupId) {
      product.productGroup = await this.productGroupRepository.findOne({
        where: { id: productGroupId },
      });
    }
    if (manufacturerId) {
      product.manufacturer = await this.manufacturerRepository.findOne({
        where: { id: manufacturerId },
      });
    }
    if (productTagId) {
      product.productTag = await this.productTagRepository.findOne({
        where: { id: productTagId },
      });

      Object.assign(product, updateData);
      return this.productRepository.save(product);
    }
  }
  // Delete product
  async deleteProduct(user: User, id: string): Promise<void> {
    const product = await this.getProductById(user, id);
    await this.productRepository.remove(product);
  }

  async findAllFiltered(filters: FilterProductDto): Promise<Product[]> {
    const whereConditions: any = {};

    if (filters.name) {
      whereConditions.name = filters.name;
    }
    if (filters.price) {
      whereConditions.price = filters.price;
    }
    if (filters.stockQuantity) {
      whereConditions.stockQuantity = filters.stockQuantity;
    }
    if (filters.isActive !== undefined) {
      whereConditions.isActive = filters.isActive;
    }
    if (filters.expirationDate) {
      whereConditions.expirationDate = filters.expirationDate;
    }
    if (filters.categoryId) {
      whereConditions.category = { id: filters.categoryId };
    }
    if (filters.productGroupId) {
      whereConditions.productGroup = { id: filters.productGroupId };
    }
    if (filters.manufacturerId) {
      whereConditions.manufacturer = { id: filters.manufacturerId };
    }
    whereConditions.isActive = true;

    // Find products based on the dynamic conditions
    return this.productRepository.find({
      where: whereConditions,
      relations: ['category', 'productGroup', 'manufacturer'], // Load related entities
    });
  }
}
