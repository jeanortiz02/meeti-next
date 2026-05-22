import { auth } from "@/lib/auth";
import { SignUpInput } from "../schema/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";


class AuthServices {
    constructor(
        private authRepository : IAuthRepository
    ){}

    async register(credentials: SignUpInput) {
        const { name, email, password } = credentials;

        // Revisar si el usuario ya existe
        await this.authRepository.userExists(email);

        // Revisar reglas de negocio

        // Manejar el registro del usuario
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        })

        return {
            error: '',
            success: 'Cuenta creada exitosamente, por favor revisa tu correo para verificar tu cuenta.',
        }
    }
}

export const authServices = new AuthServices(authRepository);