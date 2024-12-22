import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ShopModule } from './shop/shop.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   //   useFactory: async () => {
    //   //     // Find all entity files
    //   //     const entityPaths = glob.sync(
    //   //       path.join(__dirname, '**', '*.entity{.ts,.js}'),
    //   //     );
    //   //     console.log('Entity Paths:', entityPaths); // Log the paths to debug

    //   //     // Import all entities asynchronously and check their structure
    //   //     const entities = await Promise.all(
    //   //       entityPaths.map((file) => {
    //   //         return import(file).then((module) => {
    //   //           console.log('Imported Module:', module); // Log the module to check if it's imported correctly
    //   //           return module.default || module; // Return the default export or the module itself
    //   //         });
    //   //       }),
    //   //     );

    //   //     console.log('Resolved Entities:', entities); // Log the resolved entities to check if they are correct

    //   //     return {
    //   type: 'mysql', // Database type (MySQL)
    //   host: '127.0.0.1', // Database host (localhost if running locally)
    //   port: 8889, // Default MySQL port
    //   username: 'root', // Your MySQL username
    //   password: 'root', // Your MySQL password
    //   database: 'pawsome-db-v1', // Your MySQL database name
    //   entities: [], // Pass resolved entities
    //   synchronize: true, // Set to true in development to auto-sync schema
    //   logging: true, // Enable logging for debugging purposes
    //   //     };
    //   //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'pawsome-db-v3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: 'kavinda', // Replace with a secure key
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    ShopModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
