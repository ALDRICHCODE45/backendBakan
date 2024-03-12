import { PaginationDto } from "../../domain";
import { ProductDto } from "../../domain/dtos/Products/Product.dto";
import { ProductRepository } from "../../domain/repositories/Product.repository";

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}
  async CreateProduct(productDto: ProductDto) {
    const product = await this.repository.CreateProduct(productDto);
    return product;
  }
  async GetAllProdutcs(paginationDto: PaginationDto) {
    const products = await this.repository.GetAllProdutcs(paginationDto);
    return products;
  }
}
