"use client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { editCommunityAction } from "../actions/community-actions";
import { CommunityInput, CommunitySchema } from "../schema/CommunitySchema";
import { SelectCommunity } from "../types/community.types";
import CommunityForm from "./CommunityForm";

type Props = {
  community: SelectCommunity;
};

export default function EditCommunity({ community }: Props) {
  const { id, name, description, image } = community;

  const methods = useForm({
    resolver: zodResolver(CommunitySchema),
    mode: "all",
    defaultValues: {
      name,
      description,
      image,
    },
  });

  const onSubmit = async (data: CommunityInput) => {
    const { success, error } = await editCommunityAction(data, id);

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);
      redirect('/dashboard/communities');
    }
  };
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <CommunityForm />
        <FormSubmit value="Guardar cambios" />
      </Form>
    </FormProvider>
  );
}
