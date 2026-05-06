import { Metadata } from "next";
import Heading from "@/components/typography/Heading";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { generatePageTitle } from "@/utils/metadata";

export const metadata: Metadata = {
  title: generatePageTitle("Iniciar Sesión")
}

export default function LoginPage() {
  return (
    <>
      <Heading className="text-center">Iniciar Sesión</Heading>
      <LoginForm />

    </>
  )
}