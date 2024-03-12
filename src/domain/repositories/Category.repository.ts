import { GetAllCategoriesReturnValues } from "../datasources/interfaces/interfaces";
import { CreateCategoryDto } from "../dtos/Category/create-category.dto";
import { PaginationDto } from "../dtos/shared/PaginationDto.dto";
import { CategoryEntity } from "../entities/category.entity";
import { UserEntity } from "../entities/user.entity";

export abstract class CategoryRepository {
  abstract createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity>;

  abstract getAllCategories(
    paginationDto: PaginationDto
  ): Promise<GetAllCategoriesReturnValues>;
}
