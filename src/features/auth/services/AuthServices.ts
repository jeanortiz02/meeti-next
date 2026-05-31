import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignInInput, SignUpInput } from "../schema/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";
import { APIError } from "better-auth";

class AuthServices {
  constructor(private authRepository: IAuthRepository) {}

  async register(credentials: SignUpInput) {
    const { name, email, password } = credentials;

    // Revisar si el usuario ya existe
    const user = await this.authRepository.userExists(email);

    if (user) {
      return {
        error:
          "Este correo ya está registrado, por favor inicia sesión o usa otro correo.",
        success: "",
      };
    }

    // Revisar reglas de negocio

    // Manejar el registro del usuario
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: '/dashboard',
      },
      headers: await headers(),
    });

    return {
      error: "",
      success:
        "Cuenta creada exitosamente, por favor revisa tu correo para verificar tu cuenta.",
    };
  }

  async login(credentials: SignInInput) {
    const { email, password } = credentials;
    // Revisar si el usuario ya existe
    const user = await this.authRepository.userExists(email);

    if (!user) {
      return {
        error:
          "Este correo no está registrado, por favor registra tu cuenta o usa otro correo.",
        success: "",
      };
    }

    // Verificar su password y si verifico su cuenta
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
          callbackURL: '/dashboard',
        },
        headers: await headers(),
      });

      return {
        error: "",
        success: "Has iniciado sesión exitosamente.",
      };
    } catch (error) {
      if (error instanceof APIError) {


        console.log(error.message);
        console.log(error.statusCode);

        const message: Record<number, string> = {
          401: "Contraseña incorrecta, por favor intenta de nuevo.",
          403: "Tu cuenta no ha sido verificada, por favor revisa tu correo para verificar tu cuenta.",
        };

        const errorMessage = message[error.statusCode];

        if (errorMessage) {
          return{
            error: errorMessage,
            success: "",
          }
        }
      }
    }

    return {
      error: "",
      success: "",
    };
  }
}

export const authServices = new AuthServices(authRepository);
