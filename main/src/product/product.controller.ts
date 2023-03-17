import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService,
  ) {}

  @Get()
  getProducts() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findById(id);
    product.likes = product.likes + 1;
    this.httpService
      .post(`http://localhost:8000/api/products/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });
    return this.productService.update(product);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @EventPattern('product_created')
  async create(data: any) {
    await this.productService.create(data);
    console.log('product created success');
  }
  @EventPattern('product_updated')
  async updated(data: any) {
    await this.productService.update(data);
    console.log('product updated successfully');
  }
  @EventPattern('product_deleted')
  async delete(id: number) {
    await this.productService.delete(id);
  }
}
