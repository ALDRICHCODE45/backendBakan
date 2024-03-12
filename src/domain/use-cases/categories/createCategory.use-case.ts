import { CreateCategoryDto } from "../../dtos/Category/create-category.dto";
import { CategoryEntity } from "../../entities/category.entity";
import { UserEntity } from "../../entities/user.entity";
import { CategoryRepository } from "../../repositories/Category.repository";

interface createCategoryUseCase {
  execute(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity>;
}

export class CreateCategoryUseCase implements createCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) {}
  execute(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity> {
    return this.repository.createCategory(createCategoryDto, user);
  }
}
