import { Request, Response } from "express";
import { ProductDto } from "../../domain/dtos/Products/Product.dto";
import { ProductService } from "../services/Product.service";
import { CustomErrors, PaginationDto } from "../../domain";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError(error: any, res: Response) {
    if (error instanceof CustomErrors) {
      return res.status(error.errorCode).json({ error: error.message });
    }
    res.status(500).json({ error: "internal server error" });
  }

  CreateProduct = (req: Request, res: Response) => {
    const [err, createProductDto] = ProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (err) return res.json({ err });
    this.productService
      .CreateProduct(createProductDto!)
      .then((product) => res.json(product))
      .catch((error) => this.handleError(error, res));
  };
  GetAllProdutcs = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
    this.productService
      .GetAllProdutcs(paginationDto!)
      .then((products) => res.json(products))
      .catch((error) => this.handleError(error, res));
  };
}
