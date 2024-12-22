import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Category } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    type: Category,
  })
  @Post()
  create(
    @Body() categoryData: { name: string },
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.createCategory(categoryData, user);
  }

  @ApiOperation({ summary: "Get all categories for the user's shop" })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    type: [Category],
  })
  @Get()
  findAll(@GetUser() user: User): Promise<Category[]> {
    return this.categoryService.getCategoriesForShop(user);
  }

  @ApiOperation({ summary: 'Get a single category by ID' })
  @ApiResponse({ status: 200, description: 'The category', type: Category })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User): Promise<Category> {
    return this.categoryService.getCategoryByIdForShop(id, user);
  }

  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
  })
  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.categoryService.deleteCategory(id, user);
  }
}
