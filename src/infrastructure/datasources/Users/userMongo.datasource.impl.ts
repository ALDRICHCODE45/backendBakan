import { JwtAdapter, bcryptAdapter } from "../../../config";
import { UserModel } from "../../../data/mongo/models/User.model";
import { CustomErrors } from "../../../domain";
import { UserDatasource } from "../../../domain/datasources/user.datasource";
import { LoginUserDto } from "../../../domain/dtos/Auth/login-user.dto";
import { RegisterUserDto } from "../../../domain/dtos/Auth/register-user.dto";
import { UserEntity } from "../../../domain/entities/user.entity";

export class UserMongoDataSourceImpl implements UserDatasource {
  async findUserById(id: string): Promise<UserEntity> {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw CustomErrors.badRequest("user not found");

      return UserEntity.fromObject(user);
    } catch (error) {
      throw error;
    }
  }
  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    try {
      const { email } = registerUserDto;
      const existUser = await UserModel.findOne({ email });
      if (existUser) throw CustomErrors.badRequest("user already exist");

      const newUser = new UserModel(registerUserDto);

      //encriptar password
      newUser.password = bcryptAdapter.hash(registerUserDto.password);
      await newUser.save();

      //mandar email de confirmacion
      //mandar JWT
      const userEntity = UserEntity.fromObject(newUser);
      return userEntity;
    } catch (error) {
      throw error;
    }
  }
  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    try {
      const existsUser = await UserModel.findOne({
        email: loginUserDto.email,
      });
      if (!existsUser) throw CustomErrors.badRequest("user not found");
      const passwordMatch = bcryptAdapter.compare(
        loginUserDto!.password,
        existsUser.password as string
      );
      if (!passwordMatch)
        throw CustomErrors.badRequest("invalid password, please try again");

      return UserEntity.fromObject(existsUser);
    } catch (error) {
      throw error;
    }
  }
  async validateEmail(token: string): Promise<boolean> {
    try {
      const payload = await JwtAdapter.verifyToken(token);
      if (!payload) throw CustomErrors.unAuthorized("invalid token");

      const { email } = payload as { email: string };
      if (!email) throw CustomErrors.internalServer("email not in token");

      const user = await UserModel.findOne({ email });
      if (!user) throw CustomErrors.internalServer("email does not exists");

      user.emailValidated = true;
      await user.save();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
