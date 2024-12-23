import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import the ApiProperty decorator
import {
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  ShippingStatus,
} from '../entities/order.entity';

export class OrderItemDto {
  @ApiProperty({
    description: 'ID of the product in the order',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product in the order',
    required: true,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Unit price of the product',
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Status of the order',
    enum: OrderStatus,
    required: false,
    default: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @ApiProperty({
    description: 'Payment status of the order',
    enum: PaymentStatus,
    required: false,
    default: PaymentStatus.PENDING,
  })
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus: PaymentStatus = PaymentStatus.PENDING;

  @ApiProperty({
    description: 'Payment method used for the order',
    enum: PaymentMethod,
    required: false,
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Transaction ID for the payment',
    required: false,
  })
  @IsString()
  @IsOptional()
  transactionId: string;

  @ApiProperty({
    description: 'ID of the billing address for the order',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  billingAddressId: string;

  @ApiProperty({
    description: 'ID of the shipping address for the order',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  shippingAddressId: string;

  @ApiProperty({
    description: 'Shipping status of the order',
    enum: ShippingStatus,
    required: false,
    default: ShippingStatus.PENDING,
  })
  @IsEnum(ShippingStatus)
  @IsOptional()
  shippingStatus: ShippingStatus = ShippingStatus.PENDING;

  @ApiProperty({
    description: 'Shipping method used for the order',
    required: false,
  })
  @IsString()
  @IsOptional()
  shippingMethod: string;

  @ApiProperty({
    description: 'Tracking numbers for the order (if any)',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  trackingNumber: string;

  @ApiProperty({
    description: 'List of items in the order',
    type: [OrderItemDto],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  items: OrderItemDto[];

  @ApiProperty({
    description: 'Total amount of the order',
    required: false,
    example: 99.99,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalAmount: number;
}
