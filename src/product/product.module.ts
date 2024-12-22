import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Manufacturer } from './entities/manufacturer.entity';
import { ProductGroup } from './entities/product-group.entity';
import { ProductTag } from './entities/product-tag.entity';
import { Product } from './entities/product.entity';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { Shop } from 'src/shop/entities/shop.entity';
import { ManufacturerController } from './controllers/manufacturer.controller';
import { ManufacturerService } from './services/manufacturer.service';
import { ProductGroupController } from './controllers/product-group.controller';
import { ProductGroupService } from './services/product-group.service';
import { ProductTagController } from './controllers/product-tag.controller';
import { ProductTagService } from './services/product-tag.service';
import { ProductVariation } from './entities/product-variation.entity';
import { ProductVariationService } from './services/product-variation.service';
import { ProductVariationController } from './controllers/product-variation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      ProductGroup,
      ProductTag,
      Manufacturer,
      Shop,
      ProductVariation,
    ]),
    // ShopModule,
  ],
  providers: [
    ProductVariationService,
    ProductService,
    CategoryService,
    ProductGroupService,
    ProductTagService,
    ManufacturerService,
  ],
  controllers: [
    ProductVariationController,
    ProductController,
    CategoryController,
    ProductGroupController,
    ProductTagController,
    ManufacturerController,
  ],
})
export class ProductModule {}
