// src/shops/shop.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { CreateShopDto } from './dtos/create-shop.dto';
import { UpdateShopDto } from './dtos/update-shop.dto';
import { ShopService } from './shop.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Shops')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async createShop(
    @Body() createShopDto: CreateShopDto,
    @GetUser() user: User,
  ) {
    return this.shopService.createShop(createShopDto, user);
  }

  @Patch(':id')
  async updateShop(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
    @GetUser() user: User,
  ) {
    return this.shopService.updateShop(id, updateShopDto, user);
  }

  @Get(':id')
  async getShopById(@Param('id') id: string, @GetUser() user: User) {
    return this.shopService.getShopById(id, user);
  }

  @Delete(':id')
  async deleteShop(@Param('id') id: string, @GetUser() user: User) {
    return this.shopService.deleteShop(id, user);
  }

  @Get()
  async getAllShops(@GetUser() user: User) {
    return this.shopService.getAllShopsForUser(user);
  }
}
