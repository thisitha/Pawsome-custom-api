// src/shops/shop.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dtos/create-shop.dto';
import { UpdateShopDto } from './dtos/update-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) {}

  async createShop(createShopDto: CreateShopDto, user: User): Promise<Shop> {
    const existingShop = await this.shopRepository.findOne({ where: { user } });

    if (existingShop) {
      throw new BadRequestException('A user can own only one shop.');
    }

    const shop = this.shopRepository.create({ ...createShopDto, user });
    return this.shopRepository.save(shop);
  }

  async updateShop(
    id: string,
    updateShopDto: UpdateShopDto,
    user: User,
  ): Promise<Shop> {
    const shop = await this.shopRepository.findOne({ where: { id, user } });

    if (!shop) {
      throw new NotFoundException(
        'Shop not found or you do not own this shop.',
      );
    }

    Object.assign(shop, updateShopDto);
    return this.shopRepository.save(shop);
  }

  async getShopById(id: string, user: User): Promise<Shop> {
    const shop = await this.shopRepository.findOne({ where: { id, user } });

    if (!shop) {
      throw new NotFoundException(
        'Shop not found or you do not own this shop.',
      );
    }

    return shop;
  }

  async deleteShop(id: string, user: User): Promise<void> {
    const shop = await this.getShopById(id, user);
    await this.shopRepository.softDelete(shop);
  }
  async getAllShopsForUser(user: User): Promise<Shop[]> {
    if (user.role === UserRole.SUPER_ADMIN) {
      return this.shopRepository.find();
    } else {
      // Otherwise, return only the shops assigned to the specific user
      return this.shopRepository.find({
        where: { user: { id: user.id } },
      });
    }
  }
}
