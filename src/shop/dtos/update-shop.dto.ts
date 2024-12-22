// src/shops/dto/update-shop.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateShopDto } from './create-shop.dto';

export class UpdateShopDto extends PartialType(CreateShopDto) {}
