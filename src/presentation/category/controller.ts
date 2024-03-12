import { Response, Request } from "express";
import { CustomErrors, PaginationDto } from "../../domain";
import { CreateCategoryDto } from "../../domain/dtos/Category/create-category.dto";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomErrors) {
      return res.status(error.errorCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "internal server error" });
  };

  getCategory = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
    // res.json(paginationDto);

    this.categoryService
      .getAllCategories(paginationDto!)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res));
  };

  CreateCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });
    const user = req.body.user;

    this.categoryService
      .createCategory(createCategoryDto!, user)
      .then((category) => res.status(200).json(category))
      .catch((error) => this.handleError(error, res));
  };
}
