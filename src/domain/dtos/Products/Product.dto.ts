import { Validators } from "../../../config/validators";

export class ProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}
  public static create(props: { [key: string]: any }): [string?, ProductDto?] {
    const { name, available, price, description, user, category } = props;

    if (!name) return ["missing name"];

    if (!user) return ["missing user"];
    if (!Validators.isMongoId(user)) return ["invalid user Id"];

    if (!category) return ["missing category"];
    if (!Validators.isMongoId(category)) return ["invalid category Id"];

    return [
      undefined,
      new ProductDto(name, available, price, description, user, category),
    ];
  }
}
