import { Controller, Get, Module, Patch, Post, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
@Module({
  providers: [ProductService]
})
export class ProductModule {
    @Get('all')
    findAll(): string {
        return 'Get all products';
    }

    @Post('add')
    create(): string {
        return 'Create a new product';
    }

    @Get(':id')
    findOneById(@Param('id') id: string): string {
        return `Find product with id: ${id}`;
    }

    @Patch(':id')
    updateById(@Param('id') id: string): string {
        return `Update product with id: ${id}`;
    }
}
