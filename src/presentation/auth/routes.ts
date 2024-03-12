import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { UserPostgresDatasourceImpl } from "../../infrastructure/datasources/Users/userPostgres.datasource";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { UserMongoDataSourceImpl } from "../../infrastructure/datasources/Users/userMongo.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.respository.impl";

export class Authroutes {
  static get routes(): Router {
    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );

    const mongoDatasource = new UserMongoDataSourceImpl();
    const postgresDatasource = new UserPostgresDatasourceImpl();
    const respository = new UserRepositoryImpl(mongoDatasource);
    const authService = new AuthService(respository, emailService);
    const controller = new AuthController(authService);

    // Definir las rutas
    router.post("/login", controller.login);
    router.post("/register", controller.register);

    router.get("/validate-email/:token", controller.validateEmail);

    return router;
  }
}
