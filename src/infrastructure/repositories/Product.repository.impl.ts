import { PaginationDto } from "../../domain";
import {
  GetAllProductsReturnValues,
  ProductDatasource,
} from "../../domain/datasources/Product.datasource";
import { ProductDto } from "../../domain/dtos/Products/Product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/Product.repository";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly datasource: ProductDatasource) {}

  CreateProduct(productDto: ProductDto): Promise<ProductEntity> {
    return this.datasource.CreateProduct(productDto);
  }
  GetAllProdutcs(
    paginationDto: PaginationDto
  ): Promise<GetAllProductsReturnValues> {
    return this.datasource.GetAllProdutcs(paginationDto);
  }
}
