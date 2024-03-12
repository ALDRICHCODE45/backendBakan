import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;
    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!regularExps.email.test(email)) return ["email is not valid"];
    if (!password) return ["password is required"];
    if (password.length < 6)
      return ["password must have 6 characters at least"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
