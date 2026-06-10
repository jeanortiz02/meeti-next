"use client";

import {
    Form,
    FormError,
    FormInput,
    FormLabel,
    FormSubmit,
} from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { setPasswordAction } from "../actions/auth-actions";
import { SetPasswordInput, SetPasswordSchema } from "../schema/authSchema";

export default function SetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) redirect("/auth/forgot-password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SetPasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: SetPasswordInput) => {
    const { error, success } = await setPasswordAction(data, token);
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);
      redirect("/auth/login");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="newPassword">Nuevo Password</FormLabel>
      <FormInput
        id="newPassword"
        placeholder="Ingresa tu nuevo password"
        type="password"
        {...register("newPassword")}
      />
      {errors.newPassword && (
        <FormError>{errors.newPassword.message}</FormError>
      )}

      <FormLabel htmlFor="passwordConfirmation">Repite Password</FormLabel>
      <FormInput
        id="passwordConfirmation"
        placeholder="Repite tu password"
        type="password"
        {...register("passwordConfirmation")}
      />
      {errors.passwordConfirmation && (
        <FormError>{errors.passwordConfirmation.message}</FormError>
      )}

      <FormSubmit value="Restablecer Password" />
    </Form>
  );
}
