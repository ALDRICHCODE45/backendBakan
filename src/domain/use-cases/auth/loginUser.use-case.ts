import { LoginUserDto } from "../../dtos/Auth/login-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/User.repository";

interface loginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserEntity>;
}

export class LoginUserUseCase implements loginUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.repository.loginUser(loginUserDto);
  }
}
