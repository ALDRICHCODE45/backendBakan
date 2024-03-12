import { JwtAdapter, envs } from "../../../config";
import { htmlBody } from "../../../config/EmailHtmlBody";
import { EmailService } from "../../../presentation/services/email.service";
import { CustomErrors } from "../../errors/CustomErros";

export class SendEmailLink {
  constructor(private readonly emailService: EmailService) {}

  public sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomErrors.internalServer("error getting token");
    const link = `${envs.WEB_SERVICE_URL}/api/auth/validate-email/${token}`;

    const html = htmlBody(link);

    const options = {
      to: email,
      subject: "validate email",
      htmlBody: html,
    };
    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomErrors.internalServer("error sending email");
    return true;
  };
}
