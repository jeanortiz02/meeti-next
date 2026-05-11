"use client";

import { useForm } from "react-hook-form";
import { Form, FormInput, FormLabel, FormSubmit } from "@/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../schema/authSchema";

export default function RegisterForm() {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(SignUpSchema)
  });
  console.log(errors);

  const onSubmit = () => {
    console.log('Enviando el formulario');
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="name">Nombre</FormLabel>
      <FormInput type="text" placeholder="Ingresa tu Nombre" id="name" {...register('name')} />

      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput type="email" placeholder="Ingresa tu E-mail" id="email" {...register('email')}/>

      <FormLabel htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        placeholder="Password mínimo 8 caracteres"
        id="password"
        {...register('password')}
      />

      <FormLabel htmlFor="confirmPassword">Confirmar Password</FormLabel>
      <FormInput
        type="password"
        placeholder="Repite tu Password"
        id="confirmPassword"
        {...register('passwordConfirmation')}
      />

      <FormSubmit value="Registrarme" />
    </Form>
  );
}
