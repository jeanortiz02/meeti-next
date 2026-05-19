import { SignUpInput } from "../schema/authSchema";


class AuthServices {
    async register(credentials: SignUpInput) {
        const { name, email, password } = credentials;

        // Revisar si el usuario ya existe

        // Revisar reglas de negocio

        // Manejar el registro del usuario
    }
}

export const authServices = new AuthServices();