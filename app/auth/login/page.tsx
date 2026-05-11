import { Metadata } from "next";
import Heading from "@/components/typography/Heading";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { generatePageTitle } from "@/utils/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle("Iniciar Sesión"),
};

export default function LoginPage() {
  return (
    <>
      <Heading className="text-center">Iniciar Sesión</Heading>
      <LoginForm />

      <nav className="mt-20 flex justify-between">
        <Link href={"/auth/create-account"} className="font-bold">
          Crear Cuenta
        </Link>
        <Link href={"/auth/forgot-password"} className="font-bold">
          Olvidé mi Contraseña
        </Link>
      </nav>
    </>
  );
}
