import { UserRepository } from "../../repositories/User.repository";

interface validateEmailUseCase {
  execute(token: string): Promise<boolean>;
}

export class ValidateEmailUseCase implements validateEmailUseCase {
  constructor(private readonly repository: UserRepository) {}
  execute(token: string): Promise<boolean> {
    return this.repository.validateEmail(token);
  }
}
