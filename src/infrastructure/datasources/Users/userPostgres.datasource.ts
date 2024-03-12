import { JwtAdapter, bcryptAdapter, uuidAdapter } from "../../../config";
import { prisma } from "../../../data/prisma";
import { CustomErrors } from "../../../domain";
import { UserDatasource } from "../../../domain/datasources/user.datasource";
import { LoginUserDto } from "../../../domain/dtos/Auth/login-user.dto";
import { RegisterUserDto } from "../../../domain/dtos/Auth/register-user.dto";
import { UserEntity } from "../../../domain/entities/user.entity";

export class UserPostgresDatasourceImpl implements UserDatasource {
  async findUserById(id: string): Promise<UserEntity> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) throw CustomErrors.badRequest("user not found");
      return UserEntity.fromObject(user);
    } catch (error) {
      throw error;
    }
  }

  async registerUser(userDto: RegisterUserDto): Promise<UserEntity> {
    try {
      const findUser = await prisma.user.findFirst({
        where: {
          email: userDto.email,
        },
      });
      if (findUser) throw CustomErrors.badRequest("email already exists");
      const user = {
        ...userDto,
        password: bcryptAdapter.hash(userDto.password),
        id: uuidAdapter.id,
      };
      const newUser = await prisma.user.create({
        data: user,
      });
      return UserEntity.fromObject(newUser);
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: loginUserDto.email,
        },
      });
      if (!foundUser) throw CustomErrors.badRequest("user not found");

      const passwordMatch = bcryptAdapter.compare(
        loginUserDto.password,
        foundUser.password
      );
      if (!passwordMatch)
        throw CustomErrors.badRequest("invalid password, please try again");

      return UserEntity.fromObject(foundUser);
    } catch (error) {
      throw error;
    }
  }
  async validateEmail(token: string): Promise<boolean> {
    try {
      const payload = await JwtAdapter.verifyToken(token);
      if (!payload) throw CustomErrors.unAuthorized("invalid token");

      const { email } = payload as { email: string };
      if (!email)
        throw CustomErrors.internalServer("error while getting email");

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) throw CustomErrors.internalServer("email does not exists");

      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          emailValidated: true,
        },
      });
      return true;
    } catch (err) {
      throw err;
    }
  }
}
