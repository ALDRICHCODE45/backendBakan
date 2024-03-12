import { CustomErrors } from "../errors/CustomErros";

export class ProductEntity {
  private constructor(
    public name: string,
    public user: string,
    public category: string,
    public price?: number,
    public available?: boolean,
    public description?: string
  ) {}
  public static fromObject(props: { [key: string]: any }) {
    const { name, available, price, description, user, category } = props;
    if (!name) throw CustomErrors.badRequest("missing name");
    if (!user) throw CustomErrors.badRequest("missing user");
    if (!category) throw CustomErrors.badRequest("missing category");
    return new ProductEntity(
      name,
      user,
      category,
      price,
      available,
      description
    );
  }
}
