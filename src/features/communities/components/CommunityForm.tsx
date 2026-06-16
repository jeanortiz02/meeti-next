import {
    FormError,
    FormInput,
    FormLabel,
    FormTextArea,
} from "@/src/shared/components/forms";
import { UploadDropzone } from "@/src/shared/utils/uploadthing";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { CommunityInput } from "../schema/CommunitySchema";

export default function CommunityForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CommunityInput>();
  return (
    <>
      <FormLabel htmlFor="name">Nombre Comunidad</FormLabel>
      <FormInput
        id="name"
        type="text"
        placeholder="Titulo Comunidad"
        {...register("name")}
      />

      {errors.name && <FormError>{errors.name.message}</FormError>}

      <UploadDropzone endpoint={"meetiUploader"} 
        className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700"
        appearance={{
          button: 'font-black py-3 w-full block h-auto rounded-none after:bg-orange-500 after:h-2 after:top-0',
          label: 'text-sm text-gray-500 hover:text-gray-700',
          allowedContent: 'text-sm'
        }}
        onClientUploadComplete={(resp) => {{
          console.log(resp[0].ufsUrl);
        }}}
        content={{
          button: 'Selecciona una imagen',
          label: 'Arrastra y suelta tu imagen aquí, o haz clic para seleccionar',
          allowedContent: 'Solo se permiten imágenes (max 1MB)'
        }}
        config={{
          cn: twMerge,
          mode: 'auto',
        }}
      />

      <FormLabel htmlFor="description">Descripción Comunidad</FormLabel>
      <FormTextArea
        id="description"
        placeholder="Descripción Comunidad"
        {...register("description")}
      />

      {errors.description && (
        <FormError>{errors.description.message}</FormError>
      )}
    </>
  );
}
