export class CustomErrors extends Error {
  private constructor(
    public readonly errorCode: number,
    public readonly message: string
  ) {
    super(message);
  }
  static badRequest(message: string) {
    return new CustomErrors(400, message);
  }
  static forbiden(message: string) {
    return new CustomErrors(403, message);
  }
  static unAuthorized(message: string) {
    return new CustomErrors(401, message);
  }
  static notFound(message: string) {
    return new CustomErrors(404, message);
  }
  static internalServer(message: string) {
    return new CustomErrors(500, message);
  }
}
