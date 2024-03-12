import { CustomErrors } from "../errors/CustomErros";

export class UserEntity {
  private constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string
  ) {}
  static fromObject(object: { [key: string]: any }) {
    const { name, _id, id, email, role, password, emailValidated, img } =
      object;

    if (!_id && !id) throw CustomErrors.badRequest("Missing Id");
    if (!name) throw CustomErrors.badRequest("Missing Name");
    if (!email) throw CustomErrors.badRequest("Missing Email");
    if (!password) throw CustomErrors.badRequest("Missing password");
    if (emailValidated === undefined)
      throw CustomErrors.badRequest("Missing emailValidated");
    if (!role) throw CustomErrors.badRequest("Missing rol");

    return new UserEntity(
      _id || id,
      name,
      email,
      emailValidated,
      password,
      role,
      img
    );
  }
}
