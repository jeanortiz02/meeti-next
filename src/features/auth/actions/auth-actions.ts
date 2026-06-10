"use server"
import { ForgotPasswordInput, ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema, SignInInput, SignInSchema, SignUpInput, SignUpSchema } from "../schema/authSchema";
import { authServices } from "../services/AuthServices";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);

    if ( !data.success ) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }
    const response = await authServices.register(data.data);
    return response;
}


export async function signInAction(input : SignInInput) {
    const data = SignInSchema.safeParse(input);

    if ( !data.success ) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const response = await authServices.login(data.data);
    return response;
}

export const forgotPasswordAction = async (input: ForgotPasswordInput) => {
    const data = ForgotPasswordSchema.safeParse(input);

    if ( !data.success ) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const response = await authServices.requestPasswordReset(data.data);
    return response;
}

export const setPasswordAction = async ( input: SetPasswordInput, token: string) => {
    const data = SetPasswordSchema.safeParse(input);
    
    if ( !data.success ) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    const response = await authServices.confirmPasswordReset(data.data, token);
    return response;
}