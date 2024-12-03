import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateProductDto extends PartialType(ProductDto) {} // Allows partial fields from ProductDto
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Fetch all products
  @Get('all')
  all() {
    return this.productService.findAll();
  }

  // Fetch a single product by ID
  @Get('one/:id') // Correct route to accept dynamic `id`./dto/product.dto.ts
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // Create a new product
  @Post('create') // Use @Post() for POST requests
  create(@Body() ProductDto: ProductDto) {
    const { name, image, price, likes } = ProductDto;
    return this.productService.createProduct(name, image, price, likes);
  }

  @Patch('update/:id') // Include ':id' in the route
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);  
}
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    console.log('Delete Product', id);
    return this.productService.delete(id);
  }
}
