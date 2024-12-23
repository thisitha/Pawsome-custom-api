import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as crypto from 'crypto';

import { CreateOrderDto, OrderItemDto } from './dtos/create-order.dto';
import { Address } from './entities/order-address.entity';
import { OrderItem } from './entities/order-items.entity';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Address)
    private addressRepository: Repository<Address>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  // Method to create an order
  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
  ): Promise<Order> {
    const {
      status,
      paymentStatus,
      paymentMethod,
      transactionId,
      billingAddressId,
      shippingAddressId,
      shippingStatus,
      shippingMethod,
      items,
    } = createOrderDto;

    // Get billing and shipping address from the database
    const billingAddress = await this.addressRepository.findOne({
      where: { id: billingAddressId },
    });
    const shippingAddress = await this.addressRepository.findOne({
      where: { id: shippingAddressId },
    });

    if (!billingAddress || !shippingAddress) {
      throw new UnauthorizedException('Invalid billing or shipping address');
    }

    // Generate a random tracking number (just an example approach)
    const trackingNumber = crypto.randomBytes(8).toString('hex');

    // Create order item entities and calculate total amount
    let totalAmount = 0;
    const orderItems = items.map((item: OrderItemDto) => {
      const orderItem = new OrderItem();
      orderItem.product.id = item.productId;
      orderItem.quantity = item.quantity;
      orderItem.price = item.unitPrice;
      totalAmount += item.unitPrice * item.quantity; // Calculate total amount
      return orderItem;
    });

    // Create new Order entity
    const order = new Order();
    order.customer.userId = userId; // Use the userId from the auth header
    order.status = status || 'pending';
    order.paymentStatus = paymentStatus || 'pending';
    order.paymentMethod = paymentMethod;
    order.transactionId = transactionId;
    order.billingAddress = billingAddress;
    order.shippingAddress = shippingAddress;
    order.shippingStatus = shippingStatus || 'pending';
    order.shippingMethod = shippingMethod;
    order.trackingNumber = trackingNumber; // Assign the random tracking number
    order.totalAmount = totalAmount;
    order.items = orderItems;

    // Save order and items to the database
    const savedOrder = await this.orderRepository.save(order);

    return savedOrder;
  }
  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items'], // Fetch associated items with the order
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Update the fields of the order
    if (updateOrderDto.status) order.status = updateOrderDto.status;
    if (updateOrderDto.paymentStatus)
      order.paymentStatus = updateOrderDto.paymentStatus;
    if (updateOrderDto.paymentMethod)
      order.paymentMethod = updateOrderDto.paymentMethod;
    if (updateOrderDto.transactionId)
      order.transactionId = updateOrderDto.transactionId;
    if (updateOrderDto.shippingStatus)
      order.shippingStatus = updateOrderDto.shippingStatus;
    if (updateOrderDto.shippingMethod)
      order.shippingMethod = updateOrderDto.shippingMethod;
    if (updateOrderDto.billingAddressId)
      order.billingAddress.id = updateOrderDto.billingAddressId;
    if (updateOrderDto.shippingAddressId)
      order.shippingAddress.id = updateOrderDto.shippingAddressId;

    // Update items if present in the request
    if (updateOrderDto.items && updateOrderDto.items.length > 0) {
      // Remove all old order items
      await this.orderItemRepository.delete({ order: order });

      // Add new order items
      const newItems = await this.createOrderItems(updateOrderDto.items, order);
      order.items = newItems;

      // Recalculate the total amount based on the updated items
      order.totalAmount = newItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );
    }

    // If no new totalAmount is provided, recalculate it
    if (updateOrderDto.totalAmount && updateOrderDto.totalAmount > 0) {
      order.totalAmount = updateOrderDto.totalAmount;
    }

    // Save the updated order
    return this.orderRepository.save(order);
  }

  // Helper function to create order items from the DTO
  private async createOrderItems(
    items: OrderItemDto[],
    order: Order,
  ): Promise<OrderItem[]> {
    const orderItems = items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.product.id = item.productId;
      orderItem.quantity = item.quantity;
      orderItem.price = item.unitPrice;
      orderItem.order = order; // Associate the items with the order
      return orderItem;
    });
    return this.orderItemRepository.save(orderItems);
  }
}
