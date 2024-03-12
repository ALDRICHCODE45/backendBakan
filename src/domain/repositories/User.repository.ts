import { LoginUserDto } from "../dtos/Auth/login-user.dto";
import { RegisterUserDto } from "../dtos/Auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
  abstract validateEmail(token: string): Promise<boolean>;
  abstract findUserById(id: string): Promise<UserEntity>;
}
