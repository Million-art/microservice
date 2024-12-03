import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(name: string, image: string, price: number, likes: number): Promise<Product> {
    const product = this.productRepository.create({ name, image, price, likes });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } }); // Correct usage with 'where'
  }

  async updateProduct(id: number, updateData: Partial<Product>): Promise<Product> {
    // Check if the product exists
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Update the product with the provided data
    Object.assign(product, updateData); // Dynamically update only provided fields
    await this.productRepository.save(product);

    return product; // Return the updated product
  }
 async delete(id: number): Promise<{ message: string; deletedProduct?: Product }> {
     // Fetch the product to ensure it exists before deletion
    const productToDelete = await this.productRepository.findOne({ where: { id } });
    if (!productToDelete) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Delete the product
    await this.productRepository.delete({ id });

    return {
      message: 'Product deleted successfully',
      deletedProduct: productToDelete, // Return the deleted product details for confirmation
    };
  }
}
