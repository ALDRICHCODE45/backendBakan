import { CategoryEntity } from "../../entities/category.entity";

export interface GetAllCategoriesReturnValues {
  page: number;
  limit: number;
  total: number;
  next: string;
  prev: string | null;
  categories: CategoryEntity[];
}
