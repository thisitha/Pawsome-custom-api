import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductGroup } from '../entities/product-group.entity';
import { ProductGroupService } from '../services/product-group.service';

@ApiTags('Product Groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('product-groups')
export class ProductGroupController {
  constructor(private productGroupService: ProductGroupService) {}

  // Get all product groups
  @Get()
  @ApiResponse({
    status: 200,
    description: "Fetch all product groups related to the user's shop",
    type: ProductGroup,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No product groups found for this shop',
  })
  async getAllProductGroups(@GetUser() user: User): Promise<ProductGroup[]> {
    return this.productGroupService.getAllProductGroups(user);
  }

  // Get product group by ID
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Fetch product group by ID',
    type: ProductGroup,
  })
  @ApiResponse({
    status: 404,
    description: 'Product group not found',
  })
  async getProductGroupById(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<ProductGroup> {
    return this.productGroupService.getProductGroupById(user, id);
  }

  // Create a new product group
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product group successfully created',
    type: ProductGroup,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createProductGroup(
    @GetUser() user: User,
    @Body('name') name: string,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(user, name);
  }

  // Update an existing product group
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Product group successfully updated',
    type: ProductGroup,
  })
  @ApiResponse({
    status: 404,
    description: 'Product group not found',
  })
  async updateProductGroup(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body('name') name?: string,
  ): Promise<ProductGroup> {
    return this.productGroupService.updateProductGroup(user, id, name);
  }

  // Delete a product group
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Product group successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Product group not found',
  })
  async deleteProductGroup(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    await this.productGroupService.deleteProductGroup(user, id);
  }
}
