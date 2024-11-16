import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { AddressesModule } from './addresses/addresses.module';
import { ShopModule } from './shop/shop.module';
import { SettingsModule } from './settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { glob } from 'glob';
import { Shop } from './shop/entitits/shop.entity';
import { User } from './auth/entities/user.entity';
import { Profile } from './auth/entities/profile.entity';
import { ShopSettings } from './shop/entitits/shop-settings.entity';
import { PaymentInfo } from './shop/entitits/payment-info.entity';
import { Balance } from './shop/entitits/balance.entity';
import { ShopSocials } from './settings/entities/settings.entity';
import { Attachment } from './common/entities/attachment.entity';
import { Address, UserAddress } from './addresses/entities/address.entity';
import { Permission } from './auth/entities/permission.entity';
import { ProductsModule } from './products/products.module';
import { TypesModule } from './types/types.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { AttributesModule } from './attributes/attributes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { PaymentIntentModule } from './payment-intent/payment-intent.module';
import { Report } from './reviews/entities/reports.entity';
import { Review } from './reviews/entities/review.entity';
import { Order } from './orders/entities/orders.entity';
import {
  OrderProductPivot,
  Product,
  Variation,
  VariationOption,
} from './products/entities/product.entity';
import { Feedback } from './feedbacks/entities/feedback.entity';
import { OrderStatus } from './orders/entities/order-status.entity';
import { Coupon } from './coupons/entities/coupon.entity';
import { PaymentIntent } from './payment-intent/entities/payment-intent.entity';
import { PaymentIntentInfo } from './payment-intent/entities/payment-intent-info.entity';
import { Banner, Type } from './types/entities/type.entity';
import { Category } from './categories/entities/category.entity';
import { Tag } from './tags/entities/tag.entity';
import { AttributeValue } from './attributes/entities/attribute-value.entity';
import { Attribute } from './attributes/entities/attribute.entitiy';
import { TypeSettings } from './types/entities/type-settings.entity';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    AddressesModule,
    ShopModule,
    SettingsModule,

    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // Find all entity files
        const entityPaths = glob.sync(
          path.join(__dirname, '**', '*.entity{.ts,.js}'),
        );
        console.log('Entity Paths:', entityPaths); // Log the paths to debug

        // Import all entities asynchronously and check their structure
        const entities = await Promise.all(
          entityPaths.map((file) => {
            return import(file).then((module) => {
              console.log('Imported Module:', module); // Log the module to check if it's imported correctly
              return module.default || module; // Return the default export or the module itself
            });
          }),
        );

        console.log('Resolved Entities:', entities); // Log the resolved entities to check if they are correct

        return {
          type: 'mysql', // Database type (MySQL)
          host: '127.0.0.1', // Database host (localhost if running locally)
          port: 8889, // Default MySQL port
          username: 'root', // Your MySQL username
          password: 'root', // Your MySQL password
          database: 'pawsome-db-v1', // Your MySQL database name
          entities: [
            Shop,
            User,
            Profile,
            ShopSettings,
            PaymentInfo,
            Balance,
            ShopSocials,
            Attachment,
            Address,
            Permission,
            UserAddress,
            Report,
            Review,
            Order,
            Product,
            Feedback,
            OrderStatus,
            Coupon,
            PaymentIntent,
            PaymentIntentInfo,
            OrderProductPivot,
            Type,
            Category,
            Tag,
            Variation,
            AttributeValue,
            Attribute,
            VariationOption,
            Banner,
            TypeSettings,
          ], // Pass resolved entities
          synchronize: true, // Set to true in development to auto-sync schema
          logging: true, // Enable logging for debugging purposes
        };
      },
    }),

    ProductsModule,

    TypesModule,

    CategoriesModule,

    TagsModule,

    AttributesModule,

    ReviewsModule,

    FeedbacksModule,

    OrdersModule,

    CouponsModule,

    PaymentIntentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
