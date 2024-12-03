import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Fetch all products
  @Get('all')
  all() {
    return this.productService.findAll();
  }

  // Fetch a single product by ID
  @Get(':id') // Correct route to accept dynamic `id`./dto/product.dto.ts
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // Create a new product
  @Post('create') // Use @Post() for POST requests
  create(@Body() ProductDto: ProductDto) {
    const { name, image, price, likes } = ProductDto;
    return this.productService.createProduct(name, image, price, likes);
  }
  @Delete('/:id')
  delete(@Param('id') id: number) {
    console.log('Delete Product', id);
    return this.productService.delete(id);
  }
}
