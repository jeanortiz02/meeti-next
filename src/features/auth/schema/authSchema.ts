import z from 'zod';


export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, {error: 'El nombre es requerido'}),
    email: z.email({error: 'El email no es válido'}),  
    password: z.string().trim().min(8, {error: 'La contraseña debe tener al menos 8 caracteres'}),
    passwordConfirmation: z.string().trim().min(1, {error: 'El password de confirmación es requerido'}),
    newPassword: z.string().trim().min(8, {error: 'La contraseña debe tener al menos 8 caracteres'}),
});


export const SignInSchema = BaseAuthSchema.pick({
    email: true,
}).extend({
    password: z.string().trim().min(1, {error: 'El password no puede estar vacío'}),
});

export const SignUpSchema = BaseAuthSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true,
}).refine( data => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation']
});

export const ForgotPasswordSchema = BaseAuthSchema.pick({
    email: true,
});

export const SetPasswordSchema = BaseAuthSchema.pick({
    newPassword: true,
    passwordConfirmation: true,
}).refine( data => data.newPassword === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation']
})

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type SetPasswordInput = z.infer<typeof SetPasswordSchema>;