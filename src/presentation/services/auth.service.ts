import { RegisterUserDto } from "../../domain/dtos/Auth/register-user.dto";
import { UserRepository } from "../../domain/repositories/User.repository";
import { CustomErrors, RegisterUserUseCase } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/Auth/login-user.dto";
import { LoginUserUseCase } from "../../domain/use-cases/auth/loginUser.use-case";
import { JwtAdapter } from "../../config";
import { EmailService } from "./email.service";
import { SendEmailLink } from "../../domain/use-cases/email/sendEmailLink.use-case";
import { ValidateEmailUseCase } from "../../domain/use-cases/auth/validateEmail.use-case";

export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const user = await new RegisterUserUseCase(this.repository).execute(
      registerUserDto
    );
    const { password, ...rest } = user;

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomErrors.internalServer("internal server error");

    await new SendEmailLink(this.emailService).sendEmailValidationLink(
      user.email
    );

    return {
      user: rest,
      token: token,
    };
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await new LoginUserUseCase(this.repository).execute(
      loginUserDto
    );
    const { password, ...rest } = user;

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomErrors.internalServer("internal server error");

    return {
      user: rest,
      token,
    };
  }
  public async validateEmail(token: string) {
    return await new ValidateEmailUseCase(this.repository).execute(token);
  }
}
