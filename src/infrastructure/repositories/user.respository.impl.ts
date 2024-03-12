import { UserDatasource } from "../../domain/datasources/user.datasource";
import { LoginUserDto } from "../../domain/dtos/Auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/Auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/User.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}
  registerUser(userDto: RegisterUserDto): Promise<UserEntity> {
    return this.datasource.registerUser(userDto);
  }
  loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.datasource.loginUser(loginUserDto);
  }
  validateEmail(token: string): Promise<boolean> {
    return this.datasource.validateEmail(token);
  }
  findUserById(id: string): Promise<UserEntity> {
    return this.datasource.findUserById(id);
  }
}
