import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data: any): Promise<Product> {
    return new this.productModel(data).save();
  }

  async update(data: any): Promise<any> {
    return this.productModel.updateOne({ id: data.id }, data, {});
  }

  async delete(id: number): Promise<any> {
    return this.productModel.deleteOne({ id: id });
  }

  async findById(id: number): Promise<Product> {
    return this.productModel.findOne({id:id});
  }
}
