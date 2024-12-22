import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Manufacturer } from '../entities/manufacturer.entity';
import { ManufacturerService } from '../services/manufacturer.service';

@ApiTags('Manufacturers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  // Get all manufacturers
  @Get()
  @ApiResponse({
    status: 200,
    description: "Fetch all manufacturers related to the user's shop",
    type: Manufacturer,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No manufacturers found for this shop',
  })
  async getAllManufacturers(@GetUser() user: User): Promise<Manufacturer[]> {
    return this.manufacturerService.getAllManufacturers(user);
  }

  // Get manufacturer by ID
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Fetch manufacturer by ID',
    type: Manufacturer,
  })
  @ApiResponse({
    status: 404,
    description: 'Manufacturer not found',
  })
  async getManufacturerById(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Manufacturer> {
    return this.manufacturerService.getManufacturerById(user, id);
  }

  // Create a new manufacturer
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Manufacturer successfully created',
    type: Manufacturer,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createManufacturer(
    @GetUser() user: User,
    @Body('name') name: string,
    // @Body('description') description?: string,
    // @Body('logoUrl') logoUrl?: string,
  ): Promise<Manufacturer> {
    return this.manufacturerService.createManufacturer(
      user,
      name,
      //   description,
      //   logoUrl,
    );
  }

  // Update an existing manufacturer
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Manufacturer successfully updated',
    type: Manufacturer,
  })
  @ApiResponse({
    status: 404,
    description: 'Manufacturer not found',
  })
  async updateManufacturer(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body('name') name?: string,
    // @Body('description') description?: string,
    // @Body('logoUrl') logoUrl?: string,
  ): Promise<Manufacturer> {
    return this.manufacturerService.updateManufacturer(
      user,
      id,
      name,
      //   description,
      //   logoUrl,
    );
  }

  // Delete a manufacturer
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Manufacturer successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Manufacturer not found',
  })
  async deleteManufacturer(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    await this.manufacturerService.deleteManufacturer(user, id);
  }
}
