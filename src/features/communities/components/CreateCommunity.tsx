"use client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import CommunityForm from "./CommunityForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunitySchema } from "../schema/CommunitySchema";

export default function CreateCommunity() {
  const methods = useForm({
    resolver: zodResolver(CommunitySchema),
    mode: "all",
    defaultValues: {
        name: '',
        description: '',
    }
  });
  return (
    <>
    <FormProvider {...methods}>
      <Form>
        <CommunityForm />
        <FormSubmit value="Crear Comunidad" />
      </Form>
    </FormProvider>
    </>
  );
}
