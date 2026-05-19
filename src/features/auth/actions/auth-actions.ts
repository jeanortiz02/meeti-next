"use server"
import { SignUpInput, SignUpSchema } from "../schema/authSchema";
import { authServices } from "../services/AuthServices";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);

    if ( !data.success ) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }
    await authServices.register(data.data);
}