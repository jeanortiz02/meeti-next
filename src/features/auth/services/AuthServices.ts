import { auth } from "@/lib/auth";
import { APIError, success } from "better-auth";
import { headers } from "next/headers";
import { ForgotPasswordInput, SetPasswordInput, SignInInput, SignUpInput } from "../schema/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";

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
  async requestPasswordReset(input: ForgotPasswordInput) {
      const user = await this.authRepository.userExists(input.email);
      if(!user) {
        return {
          error: "El usuario no existe, por favor verifica el correo ingresado.",
          success: "",
        }
      }

      const { email } = input;
      await auth.api.requestPasswordReset({
        body: {
          email
        }
      })

      return {
        error: "",
        success: "Hemos enviado un correo con las instrucciones para restablecer tu contraseña, por favor revisa tu correo."
      }
  }


  async confirmPasswordReset(input: SetPasswordInput, token: string) {
    const { newPassword } = input;
    try {
      await auth.api.resetPassword({
        body: {
          newPassword,
          token
        }
      })

      return {
        error: "",
        success: "Password restablecida exitosamente, por favor inicia sesión con tu nueva contraseña."
      }
    } catch (error) {
      if ( error instanceof APIError) {
        return {
          error: "El token no es válido o ha expirado",
          success: "",
        }
      }
    }

    return {
      error: "",
      success: ""
    }
  }
}

export const authServices = new AuthServices(authRepository);
