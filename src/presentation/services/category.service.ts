import { PaginationDto } from "../../domain";
import { CreateCategoryDto } from "../../domain/dtos/Category/create-category.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CategoryRepository } from "../../domain/repositories/Category.repository";
import { GetAllCategoriesUseCase } from "../../domain/use-cases/categories/GetAllCategories.use-case";
import { CreateCategoryUseCase } from "../../domain/use-cases/categories/createCategory.use-case";

export class CategoryService {
  //DI
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    //creamos una nueva categoria que ya contiene el id del usuario que la creo
    const category = await new CreateCategoryUseCase(
      this.categoryRepository
    ).execute(createCategoryDto, user);

    //extraemos propiedades necesarias
    const { available, id, name } = category;

    return {
      available,
      id,
      categoryName: name,
      user: {
        name: user.name,
        id: user.id,
      },
    };
  }
  async getAllCategories(paginationDto: PaginationDto) {
    const categories = await new GetAllCategoriesUseCase(
      this.categoryRepository
    ).execute(paginationDto);
    return {
      ...categories,
    };
  }
}
