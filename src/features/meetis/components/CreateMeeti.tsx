"use client";
import { useSession } from "@/src/lib/auth-client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import MeetiForm from "./MeetiForm";
import { createMeetiAction } from "../actions/meeti-actions";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CreateMeeti() {
  const methods = useForm<MeetiInput>({
    resolver: zodResolver(MeetiSchema),
    mode: "all",
    defaultValues: {
      title: "",
      details: "",
      categoryId: "",
      communityId: "",
      availableSeats: 0,
      date: "",
      time: "",
      image: "",
      virtual: false,
      location: {
        placeName: "",
        address: "",
        city: "",
        country: "",
        lat: 18.483046,
        lng: -69.803680,
      },
    },
  });

  const { isPending } = useSession();
  if (isPending) return "Cargando sesión...";

  const onSubmit = async (input: MeetiInput) => {
    const { error, success } = await createMeetiAction(input)

    if(error) toast.error(error)
    if(success) toast.success(success)
    redirect('/dashboard/meetis')
  }
  return (
    <>
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <MeetiForm />
        <FormSubmit value={"Crear Meeti"} />
      </Form>
    </FormProvider>
    </>
  );
}
