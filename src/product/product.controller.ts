import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dtos/filter-product.dto';

@ApiTags('products')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: "Get all products for the logged-in user's shop" })
  @ApiResponse({
    status: 200,
    description: 'The list of products.',
    type: [Product],
  })
  async getAll(@Request() req: any): Promise<Product[]> {
    const user: User = req.user;
    return this.productService.getAllProducts(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product object.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getById(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<Product> {
    const user: User = req.user;
    return this.productService.getProductById(user, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The created product.',
    type: Product,
  })
  async create(
    @Request() req: any,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const user: User = req.user;
    return this.productService.createProduct(user, createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiResponse({
    status: 200,
    description: 'The updated product.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const user: User = req.user;
    return this.productService.updateProduct(user, id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'The product has been deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async delete(@Request() req: any, @Param('id') id: string): Promise<void> {
    const user: User = req.user;
    return this.productService.deleteProduct(user, id);
  }
  @Get('get-all-with-filters')
  @ApiResponse({
    status: 200,
    description: 'Get filtered list of products',
    type: [Product],
  })
  async getFilteredProducts(
    @Query() filters: FilterProductDto,
  ): Promise<Product[]> {
    return this.productService.findAllFiltered(filters);
  }
}
