import { emailConfig } from "../config/config";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/VerificationEmail";
import { VerificationEmailData } from "../types/email.types";
import { EmailService } from "./EmailService";


export class AuthService {

    static async sendVerificationEmail(data : VerificationEmailData) : Promise<void> {
        await EmailService.send({
            from: emailConfig.from.verification,
            to: data.email,
            subject: 'Verificación de cuenta en Meeti',
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data),
        })
    }
}