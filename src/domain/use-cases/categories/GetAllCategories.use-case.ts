import { GetAllCategoriesReturnValues } from "../../datasources/interfaces/interfaces";
import { PaginationDto } from "../../dtos/shared/PaginationDto.dto";
import { CategoryRepository } from "../../repositories/Category.repository";

interface getAllCategoriesUseCase {
  execute(paginationDto: PaginationDto): Promise<GetAllCategoriesReturnValues>;
}

export class GetAllCategoriesUseCase implements getAllCategoriesUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  execute(paginationDto: PaginationDto): Promise<GetAllCategoriesReturnValues> {
    return this.repository.getAllCategories(paginationDto);
  }
}
