/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Repository } from 'typeorm';
import { Manufacturer } from '../entities/manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,

    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  // Fetch all manufacturers based on user role and shop relation
  async getAllManufacturers(user: User): Promise<Manufacturer[]> {
    if (user.role === 'super_admin') {
      return this.manufacturerRepository.find();
    }

    // Get the shop associated with the current user
    const shop = await this.shopRepository.findOne({
      where: { user: { userId: user.userId } },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }

    // Fetch manufacturers associated with the shop
    return this.manufacturerRepository.find({
      where: { shop: shop },
    });
  }

  // Fetch a manufacturer by ID
  async getManufacturerById(user: User, id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
      relations: ['shop'], // Include shop relation
    });

    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }

    if (
      user.role !== 'super_admin' &&
      manufacturer.shop.user.userId !== user.userId
    ) {
      throw new NotFoundException(
        'You do not have permission to access this manufacturer',
      );
    }

    return manufacturer;
  }

  // Create a new manufacturer and associate it with the user's shop
  async createManufacturer(
    user: User,
    name: string,
    description?: string,
    logoUrl?: string,
  ): Promise<Manufacturer> {
    let shop = null;
    if (user.role !== 'super_admin') {
      shop = await this.shopRepository.findOne({
        where: { user: { userId: user.userId } },
      });

      if (!shop) {
        throw new NotFoundException('Shop not found for this user');
      }
    }

    const manufacturer = this.manufacturerRepository.create({
      name,

      shop: shop,
    });

    return this.manufacturerRepository.save(manufacturer);
  }

  // Update an existing manufacturer
  async updateManufacturer(
    user: User,
    id: string,
    name?: string,
    description?: string,
    logoUrl?: string,
  ): Promise<Manufacturer> {
    const manufacturer = await this.getManufacturerById(user, id);

    manufacturer.name = name ?? manufacturer.name;
    // manufacturer.description = description ?? manufacturer.description;
    // manufacturer.logoUrl = logoUrl ?? manufacturer.logoUrl;

    return this.manufacturerRepository.save(manufacturer);
  }

  // Delete a manufacturer
  async deleteManufacturer(user: User, id: string): Promise<void> {
    const manufacturer = await this.getManufacturerById(user, id);

    await this.manufacturerRepository.remove(manufacturer);
  }
}
