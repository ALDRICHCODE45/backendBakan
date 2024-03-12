import { CustomErrors } from "../errors/CustomErros";

export class CategoryEntity {
  private constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public user: string
  ) {}
  static fromObject(object: { [key: string]: any }) {
    const { id, name, user, available, _id } = object;
    if (!id && !_id) throw CustomErrors.badRequest("missing category id");
    if (!name) throw CustomErrors.badRequest("missing category name");
    if (!user) throw CustomErrors.badRequest("missing category user");
    if (typeof available !== "boolean")
      throw CustomErrors.badRequest("missing category available");
    return new CategoryEntity(id || _id, name, available, user);
  }
}
