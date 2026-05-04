import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generatePageTitle("Crear Cuenta")
}

export default function RegisterPage() {
  return (
    <>
      <Heading>Crear Cuenta</Heading>
    </>
  )
}