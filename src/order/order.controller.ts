import {
  Body,
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create Order
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User, // Use the GetUser decorator to get the user object
  ): Promise<Order> {
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    return this.orderService.createOrder(createOrderDto, user.userId);
  }

  // Update Order
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided.',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string, // Parse and validate the ID from the URL parameter
    @Body() updateOrderDto: UpdateOrderDto,
    @GetUser() user: User, // Get the user from the request
  ): Promise<Order> {
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    return this.orderService.updateOrder(id, updateOrderDto);
  }
}
