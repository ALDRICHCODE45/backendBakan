import { GetAllProductsReturnValues } from "../datasources/Product.datasource";
import { ProductDto } from "../dtos/Products/Product.dto";
import { PaginationDto } from "../dtos/shared/PaginationDto.dto";
import { ProductEntity } from "../entities/product.entity";

export abstract class ProductRepository {
  abstract CreateProduct(productDto: ProductDto): Promise<ProductEntity>;

  abstract GetAllProdutcs(
    paginationDto: PaginationDto
  ): Promise<GetAllProductsReturnValues>;
}
