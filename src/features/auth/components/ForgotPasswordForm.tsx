'use client'

import { Form, FormInput, FormLabel, FormSubmit } from "@/components/forms";


export default function ForgotPasswordForm() {
  return (
    <Form>
        <FormLabel htmlFor="email">E-mail</FormLabel>
        <FormInput type="email" id="email" name="email"/>

        <FormSubmit value={'Enviar instrucciones'}/>
    </Form>
  )
}
