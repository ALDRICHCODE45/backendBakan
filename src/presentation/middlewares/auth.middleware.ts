import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserRepository } from "../../domain/repositories/User.repository";
import { FindUserByIdUseCase } from "../../domain/use-cases/auth/findUserById.use-case";

export class AuthMiddleware {
  constructor(private readonly repository: UserRepository) {}

  ValidateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "not token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";
    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload) return res.status(404).json({ error: "invalid token" });

      const user = await new FindUserByIdUseCase(this.repository).execute(
        payload.id
      );

      req.body.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}
