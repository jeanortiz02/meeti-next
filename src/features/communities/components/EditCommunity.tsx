'use client'
import { Form, FormSubmit } from '@/src/shared/components/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { CommunitySchema } from '../schema/CommunitySchema';
import CommunityForm from './CommunityForm';

export default function EditCommunity() {
    const methods = useForm({
    resolver: zodResolver(CommunitySchema),
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });
  return (
    <FormProvider {...methods}>
        <Form>
            <CommunityForm />
            <FormSubmit value="Editar Comunidad" />
        </Form>
    </FormProvider>
  )
}
