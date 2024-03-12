import { RegisterUserDto } from "../../dtos/Auth/register-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/User.repository";

interface registerUserUseCase {
  execute(dto: RegisterUserDto): Promise<UserEntity>;
}

export class RegisterUserUseCase implements registerUserUseCase {
  constructor(private readonly repository: UserRepository) {}
  execute(dto: RegisterUserDto): Promise<UserEntity> {
    return this.repository.registerUser(dto);
  }
}
