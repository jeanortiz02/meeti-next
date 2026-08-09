'use client';
import { Form, FormSubmit } from "@/src/shared/components/forms";
import MeetiForm from "./MeetiForm";
import { useSession } from "@/src/lib/auth-client";


export default function CreateMeeti() {
    const {isPending } = useSession();
    if (isPending) return "Cargando sesión...";
  return (
    <>
        <Form>

            <MeetiForm />
            <FormSubmit value={'Crear Meeti'}/>
        </Form>
    </>
  )
}
