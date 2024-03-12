import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/User.repository";

interface findUserByIdUseCase {
  execute(id: string): Promise<UserEntity>;
}

export class FindUserByIdUseCase implements findUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}
  execute(id: string): Promise<UserEntity> {
    return this.repository.findUserById(id);
  }
}
