import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/order-address.entity';
import { OrderItem } from './entities/order-items.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Address])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
