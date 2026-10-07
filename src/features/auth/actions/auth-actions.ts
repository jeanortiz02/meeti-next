"use server"
import { getClientIp } from "@/src/shared/utils/ip";
import { ForgotPasswordInput, ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema, SignInInput, SignInSchema, SignUpInput, SignUpSchema } from "../schema/authSchema";
import { authServices } from "../services/AuthServices";
import { rateLimit } from "@/src/lib/limiter";
import { getMinutesDiffFromNow } from "@/src/shared/utils/date";

export async function signUpAction(input: SignUpInput) {

    // rate limit
    const ip = await getClientIp();
    const { success, reset} = await rateLimit.limit(ip)

    if(!success) {
        return {
            error: `Demasiadas solicitudes. Intenta de nuevo en ${getMinutesDiffFromNow(reset)} minutos.`,
            success: ''
        }
    }

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

    // rate limit
    const ip = await getClientIp();
    const { success, reset} = await rateLimit.limit(ip)

    if(!success) {
        return {
            error: `Demasiadas solicitudes. Intenta de nuevo en ${getMinutesDiffFromNow(reset)} minutos.`,
            success: ''
        }
    }

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

    // rate limit
    const ip = await getClientIp();
    const { success, reset} = await rateLimit.limit(ip)

    if(!success) {
        return {
            error: `Demasiadas solicitudes. Intenta de nuevo en ${getMinutesDiffFromNow(reset)} minutos.`,
            success: ''
        }
    }

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