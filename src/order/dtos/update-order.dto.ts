import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  Min,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importing the ApiProperty decorator

import { OrderItemDto } from './create-order.dto'; // Adjusted the path to match your DTO location
import {
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  ShippingStatus,
} from '../entities/order.entity';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Status of the order',
    enum: OrderStatus,
    required: false,
    default: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({
    description: 'Payment status of the order',
    enum: PaymentStatus,
    required: false,
    default: PaymentStatus.PENDING,
  })
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;

  @ApiProperty({
    description: 'Payment method used for the order',
    enum: PaymentMethod,
    required: false,
    default: PaymentMethod.CREDIT_CARD,
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiProperty({
    description: 'Transaction ID for the payment',
    required: false,
  })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiProperty({
    description: 'ID of the billing address for the order',
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  billingAddressId?: string;

  @ApiProperty({
    description: 'ID of the shipping address for the order',
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  shippingAddressId?: string;

  @ApiProperty({
    description: 'Shipping status of the order',
    enum: ShippingStatus,
    required: false,
    default: ShippingStatus.PENDING,
  })
  @IsEnum(ShippingStatus)
  @IsOptional()
  shippingStatus?: ShippingStatus;

  @ApiProperty({
    description: 'Shipping method used for the order',
    required: false,
  })
  @IsString()
  @IsOptional()
  shippingMethod?: string;

  @ApiProperty({
    description: 'Tracking numbers for the order (if any)',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  trackingNumber?: string[];

  @ApiProperty({
    description: 'List of items in the order',
    type: [OrderItemDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  items?: OrderItemDto[];

  @ApiProperty({
    description: 'Total amount of the order',
    required: false,
    example: 99.99,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalAmount?: number;
}
