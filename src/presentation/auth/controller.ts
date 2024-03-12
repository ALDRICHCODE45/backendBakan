import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/Auth/register-user.dto";
import { AuthService } from "../services/auth.service";
import { CustomErrors } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/Auth/login-user.dto";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomErrors) {
      return res.status(error.errorCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "internal server error" });
  };

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    this.authService
      .validateEmail(token)
      .then(() => res.json("email validated"))
      .catch((err) => this.handleError(err, res));
  };
}
