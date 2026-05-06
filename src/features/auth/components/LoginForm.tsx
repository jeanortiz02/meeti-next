'use client'

import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/components/forms";

export default function LoginForm() {
  return (
    <Form>
      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput type="email" placeholder="Ingresa tu E-mail" id="email" />

      <FormLabel htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        placeholder="Ingresa tu Contraseña"
        id="password"
      />

      <FormSubmit value="Iniciar sesión" />
    </Form>
  );
}
