export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ["email is required"];
    if (!password) return ["password is required"];
    return [undefined, new LoginUserDto(email, password)];
  }
}
