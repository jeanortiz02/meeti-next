"use client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { editMeetiAction } from "../actions/meeti-actions";
import {
  MeetiFormInput,
  MeetiFormOutput,
  MeetiInput,
  MeetiSchema,
} from "../schemas/meetiSchema";
import { SelectMeeti } from "../types/meeti.types";
import MeetiForm from "./MeetiForm";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

type EditProps = {
  meeti: SelectMeeti;
};
export default function EditForm({ meeti }: EditProps) {
  const methods = useForm<MeetiFormInput, unknown, MeetiFormOutput>({
    resolver: zodResolver(MeetiSchema),
    mode: "all",
    defaultValues: meeti.virtual
      ? {
          ...meeti,
          virtual: true,
        }
      : {
          ...meeti,
          location: {
            ...meeti.location!,
          },
        },
  });

  const onSubmit = async (data: MeetiInput) => {
    const { error, success } = await editMeetiAction(meeti.id, data);

    if (success) {
      toast.success(success);
      redirect("/dashboard/meetis");
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MeetiForm />
        <FormSubmit value={"Guardar Cambios"} />
      </Form>
    </FormProvider>
  );
}
