import { ProductModel } from "../../../data/mongo/models/Product.model";
import { CustomErrors, PaginationDto } from "../../../domain";
import {
  GetAllProductsReturnValues,
  ProductDatasource,
} from "../../../domain/datasources/Product.datasource";
import { ProductDto } from "../../../domain/dtos/Products/Product.dto";
import { ProductEntity } from "../../../domain/entities/product.entity";

export class ProductMongoDatasourceImpl extends ProductDatasource {
  async CreateProduct(productDto: ProductDto): Promise<ProductEntity> {
    try {
      const productExist = await ProductModel.findOne({
        name: productDto.name,
      });

      if (productExist) throw CustomErrors.badRequest("product already exists");
      const product = new ProductModel(productDto);
      await product.save();
      return ProductEntity.fromObject(product);
    } catch (error) {
      throw error;
    }
  }
  async GetAllProdutcs(
    paginationDto: PaginationDto
  ): Promise<GetAllProductsReturnValues> {
    const { limit, page } = paginationDto;
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate({
            path: "user",
            select: "name -_id",
          })
          .populate({
            path: "category",
            select: "name -_id",
          }),
      ]);
      return {
        page,
        limit,
        total,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        prev: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products.map((category) =>
          ProductEntity.fromObject(category)
        ),
      };
    } catch (error) {
      throw error;
    }
  }
}
