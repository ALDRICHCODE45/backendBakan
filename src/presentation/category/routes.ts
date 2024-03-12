import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.respository.impl";
import { UserMongoDataSourceImpl } from "../../infrastructure/datasources/Users/userMongo.datasource.impl";
import { CategoryMongoDatasourceImpl } from "../../infrastructure/datasources/Categories/CategoryMongo.datasource.impl";
import { CategoryRepositoryImpl } from "../../infrastructure/repositories/Category.repository.impl";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const usermongoDatasource = new UserMongoDataSourceImpl();
    const userRepository = new UserRepositoryImpl(usermongoDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    const categoryMongoDatasource = new CategoryMongoDatasourceImpl();
    const categoryRepository = new CategoryRepositoryImpl(
      categoryMongoDatasource
    );
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    router.get("/", categoryController.getCategory);
    router.post(
      "/",
      [authMiddleware.ValidateJWT],
      categoryController.CreateCategory
    );

    return router;
  }
}
