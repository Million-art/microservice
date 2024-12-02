import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(name: string, description: string, price: number, stock: number): Promise<Product> {
    const product = this.productRepository.create({ name, description, price, stock });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } }); // Correct usage with 'where'
  }

  async updateProduct(id: number, name: string, description: string, price: number, stock: number): Promise<Product> {
    await this.productRepository.update(id, { name, description, price, stock });
    return this.productRepository.findOne({ where: { id } }); // Correct usage with 'where'
  }
}
