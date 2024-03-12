import { ProductDto } from "../dtos/Products/Product.dto";
import { PaginationDto } from "../dtos/shared/PaginationDto.dto";
import { ProductEntity } from "../entities/product.entity";

export interface GetAllProductsReturnValues {
  page: number;
  limit: number;
  total: number;
  next: string;
  prev: string | null;
  products: ProductEntity[];
}

export abstract class ProductDatasource {
  abstract CreateProduct(productDto: ProductDto): Promise<ProductEntity>;
  abstract GetAllProdutcs(
    paginationDto: PaginationDto
  ): Promise<GetAllProductsReturnValues>;
}
