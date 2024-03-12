import { PaginationDto } from "../../domain";
import { CategoryDatasource } from "../../domain/datasources/category.datasource";
import { GetAllCategoriesReturnValues } from "../../domain/datasources/interfaces/interfaces";
import { CreateCategoryDto } from "../../domain/dtos/Category/create-category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { CategoryRepository } from "../../domain/repositories/Category.repository";

const hero = (name: string) => {
  if (!name) return "name is required";
};

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource) {}
  createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity> {
    return this.datasource.createCategory(createCategoryDto, user);
  }
  getAllCategories(
    paginationDto: PaginationDto
  ): Promise<GetAllCategoriesReturnValues> {
    return this.datasource.getAllCategories(paginationDto);
  }
}
