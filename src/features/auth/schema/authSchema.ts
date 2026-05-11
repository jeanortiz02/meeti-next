import z from 'zod';


export const BaseAuthSchema = z.object({
    name: z.string().min(1, {error: 'El nombre es requerido'}),
    email: z.email({error: 'El email no es válido'}),  
    password: z.string().min(8, {error: 'La contraseña debe tener al menos 8 caracteres'}),
    passwordConfirmation: z.string().min(1, {error: 'El password de confirmación es requerido'}),
});


export const SignUpSchema = BaseAuthSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true
});