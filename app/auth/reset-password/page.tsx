import SetPasswordForm from "@/src/features/auth/components/SetPasswordForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle("Restablecer Contraseña"),
};

export default function ResetPasswordPage() {
  return (
    <>
      <Heading>Define tu nuevo password</Heading>
      <SetPasswordForm />

      <nav className="mt-20 flex justify-between">
        <Link href={"/auth/login"} className="font-bold">
          Iniciar Sesión
        </Link>
        <Link href={"/auth/create-account"} className="font-bold">
          Crear Cuenta
        </Link>
      </nav>
    </>
  );
}
