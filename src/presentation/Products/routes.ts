import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services/Product.service";
import { ProductRepositoryImpl } from "../../infrastructure/repositories/Product.repository.impl";
import { ProductMongoDatasourceImpl } from "../../infrastructure/datasources/Products/ProductMongo.datasource.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserMongoDataSourceImpl } from "../../infrastructure/datasources/Users/userMongo.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.respository.impl";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productDatasource = new ProductMongoDatasourceImpl();
    const productRepository = new ProductRepositoryImpl(productDatasource);
    const productService = new ProductService(productRepository);
    const controller = new ProductController(productService);

    //Validate JWT and put it on the request object
    const usermongoDatasource = new UserMongoDataSourceImpl();
    const userRepository = new UserRepositoryImpl(usermongoDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.post("/", [authMiddleware.ValidateJWT], controller.CreateProduct);
    router.get("/", controller.GetAllProdutcs);

    return router;
  }
}
