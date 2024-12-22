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
import { ProductVariation } from './entities/product-variation.entity';

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
    @InjectRepository(ProductVariation)
    private readonly productVariationRepository: Repository<ProductVariation>,
  ) {}

  // Get all products based on the user's shop
  async getAllProducts(user: User): Promise<Product[]> {
    if (user.role === 'super_admin') {
      return this.productRepository.find();
    }

    const shop = await this.shopRepository.findOne({
      where: { user: { userId: user.userId } },
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

    if (
      user.role !== 'super_admin' &&
      product.shop.user.userId !== user.userId
    ) {
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
        where: { user: { userId: user.userId } },
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
      variations,
      ...rest
    } = createProductDto;

    // Fetch related entities
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

    // Create the product
    const product = this.productRepository.create({
      ...rest,
      shop,
      category,
      productGroup,
      manufacturer,
      productTag,
    });

    // Save the product to generate product ID
    const savedProduct = await this.productRepository.save(product);

    // Handle product variations if they exist
    if (variations && variations.length > 0) {
      const productVariations = variations.map((variation) => {
        return this.productVariationRepository.create({
          ...variation,
          product: savedProduct, // Link the variation to the product
        });
      });

      // Save product variations
      await this.productVariationRepository.save(productVariations);
    }

    return savedProduct;
  }

  // Update an existing product
  async updateProduct(
    user: User,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Get the product by ID
    const product = await this.getProductById(user, id);

    const {
      categoryId,
      productGroupId,
      manufacturerId,
      productTagId,
      variations, // Handle variations separately
      ...updateData
    } = updateProductDto;

    // Update the product's other fields
    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      product.category = category;
    }

    if (productGroupId) {
      const productGroup = await this.productGroupRepository.findOne({
        where: { id: productGroupId },
      });
      product.productGroup = productGroup;
    }

    if (manufacturerId) {
      const manufacturer = await this.manufacturerRepository.findOne({
        where: { id: manufacturerId },
      });
      product.manufacturer = manufacturer;
    }

    if (productTagId) {
      const productTag = await this.productTagRepository.findOne({
        where: { id: productTagId },
      });
      product.productTag = productTag;
    }

    // Update other product fields (name, price, etc.)
    Object.assign(product, updateData);

    // Save the product
    const updatedProduct = await this.productRepository.save(product);

    // If variations are included in the update request
    if (variations && variations.length > 0) {
      // Update each variation
      for (const variation of variations) {
        // Find the variation by ID
        const existingVariation = await this.productVariationRepository.findOne(
          {
            where: { id: variation.id, product: product },
          },
        );

        if (existingVariation) {
          // Update the existing variation with the new data
          Object.assign(existingVariation, variation);
          await this.productVariationRepository.save(existingVariation);
        } else {
          // If the variation doesn't exist, create a new one
          const newVariation = this.productVariationRepository.create({
            ...variation,
            product: updatedProduct,
          });
          await this.productVariationRepository.save(newVariation);
        }
      }
    }

    return updatedProduct;
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
