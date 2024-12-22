import {
  UseGuards,
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductTag } from '../entities/product-tag.entity';
import { ProductTagService } from '../services/product-tag.service';

@ApiTags('Product Tags')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('product-tags')
export class ProductTagController {
  constructor(private productTagService: ProductTagService) {}

  // Get all product tags
  @Get()
  @ApiResponse({
    status: 200,
    description: "Fetch all product tags related to the user's shop",
    type: ProductTag,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No product tags found for this shop',
  })
  async getAllProductTags(@GetUser() user: User): Promise<ProductTag[]> {
    return this.productTagService.getAllProductTags(user);
  }

  // Get product tag by ID
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Fetch product tag by ID',
    type: ProductTag,
  })
  @ApiResponse({
    status: 404,
    description: 'Product tag not found',
  })
  async getProductTagById(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<ProductTag> {
    return this.productTagService.getProductTagById(user, id);
  }

  // Create a new product tag
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product tag successfully created',
    type: ProductTag,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createProductTag(
    @GetUser() user: User,
    @Body('name') name: string,
  ): Promise<ProductTag> {
    return this.productTagService.createProductTag(user, name);
  }

  // Update an existing product tag
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Product tag successfully updated',
    type: ProductTag,
  })
  @ApiResponse({
    status: 404,
    description: 'Product tag not found',
  })
  async updateProductTag(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body('name') name?: string,
  ): Promise<ProductTag> {
    return this.productTagService.updateProductTag(user, id, name);
  }

  // Delete a product tag
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Product tag successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Product tag not found',
  })
  async deleteProductTag(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    await this.productTagService.deleteProductTag(user, id);
  }
}
