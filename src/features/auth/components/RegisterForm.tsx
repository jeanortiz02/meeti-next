"use client";

import { Form, FormInput, FormLabel, FormSubmit } from "@/components/forms";

export default function RegisterForm() {
  return (
    <Form>
      <FormLabel htmlFor="name">Nombre</FormLabel>
      <FormInput type="text" placeholder="Ingresa tu Nombre" id="name" />

      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput type="email" placeholder="Ingresa tu E-mail" id="email" />

      <FormLabel htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        placeholder="Password mínimo 8 caracteres"
        id="password"
      />

      <FormLabel htmlFor="confirmPassword">Confirmar Password</FormLabel>
      <FormInput
        type="password"
        placeholder="Repite tu Password"
        id="confirmPassword"
      />

      <FormSubmit value="Registrarme" />
    </Form>
  );
}
