"use client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { SelectMeeti } from "../types/meeti.types";
import MeetiForm from "./MeetiForm";
import { editMeetiAction } from "../actions/meeti-actions";

type EditProps = {
  meeti: SelectMeeti;
};
export default function EditForm({ meeti }: EditProps) {
  const methods = useForm<MeetiInput>({
    resolver: zodResolver(MeetiSchema),
    mode: "all",
    defaultValues: meeti.virtual ? {
        ...meeti,
        virtual: true
    } : {
        ...meeti,
        location: {
            ...meeti.location!
        }
    }
  });


  const onSubmit = async (data: MeetiInput) =>{
    await editMeetiAction(meeti.id, data);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MeetiForm />
        <FormSubmit value={"Guardar Cambios"} />
      </Form>
    </FormProvider>
  );
}
