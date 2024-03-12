import { CategoryModel } from "../../../data/mongo/models/Category.model";
import { CustomErrors, PaginationDto } from "../../../domain";
import { CategoryDatasource } from "../../../domain/datasources/category.datasource";
import { GetAllCategoriesReturnValues } from "../../../domain/datasources/interfaces/interfaces";
import { CreateCategoryDto } from "../../../domain/dtos/Category/create-category.dto";
import { CategoryEntity } from "../../../domain/entities/category.entity";
import { UserEntity } from "../../../domain/entities/user.entity";

export class CategoryMongoDatasourceImpl implements CategoryDatasource {
  constructor() {}

  async getAllCategories(
    paginationDto: PaginationDto
  ): Promise<GetAllCategoriesReturnValues> {
    const { limit, page } = paginationDto;
    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .populate({
            path: "user",
            select: "name -_id",
          })
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      return {
        page,
        limit,
        total,
        next: `/api.categories?page=${page + 1}&limit=${limit}`,
        prev:
          page > 1 ? `/api.categories?page=${page - 1}&limit=${limit}` : null,
        categories: categories.map((category) =>
          CategoryEntity.fromObject(category)
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity> {
    const categoryExist = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExist) throw CustomErrors.badRequest("category already exists");
    try {
      const newCategory = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await newCategory.save();
      return CategoryEntity.fromObject(newCategory);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
