"use client";

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { SignUpInput, SignUpSchema } from "../schema/authSchema";
import { signUpAction } from "../actions/auth-actions";

export default function RegisterForm() {
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: 'all'
  });

  const onSubmit = async (input : SignUpInput) => {
      const {error, success} = await signUpAction(input);

      if ( error ) {
        toast.error(error);
        return;
      }

      if ( success ) {
        toast.success(success);
        reset();
      }

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="name">Nombre</FormLabel>
      <FormInput type="text" placeholder="Ingresa tu Nombre" id="name" {...register('name')} />
      {errors.name && <FormError>{errors.name?.message}</FormError>}

      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput type="email" placeholder="Ingresa tu E-mail" id="email" {...register('email')}/>
      {errors.email && <FormError>{errors.email?.message}</FormError>}

      <FormLabel htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        placeholder="Password mínimo 8 caracteres"
        id="password"
        {...register('password')}
      />
      {errors.password && <FormError>{errors.password?.message}</FormError>}

      <FormLabel htmlFor="confirmPassword">Confirmar Password</FormLabel>
      <FormInput
        type="password"
        placeholder="Repite tu Password"
        id="confirmPassword"
        {...register('passwordConfirmation')}
      />
      {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation?.message}</FormError>}

      <FormSubmit value="Registrarme" />
    </Form>
  );
}
