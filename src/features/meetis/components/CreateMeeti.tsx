'use client';
import { Form, FormSubmit } from "@/src/shared/components/forms";
import MeetiForm from "./MeetiForm";


export default function CreateMeeti() {
  return (
    <>
        <Form>

            <MeetiForm />
            <FormSubmit value={'Crear Meeti'}/>
        </Form>
    </>
  )
}
