import { CommunityInput } from "@/src/features/communities/schema/CommunitySchema";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { UploadDropzone } from "../../utils/uploadthing";
import { FormError } from "../forms";

export default function UploadImage() {
  const { formState: { errors }, setValue, clearErrors, getValues } = useFormContext<CommunityInput>();
  const [uploadedImage, setUploadedImage] = useState("");
  const currentImage = getValues("image") ? getValues("image") : null;

  return (
    <>
      <UploadDropzone
        endpoint={"meetiUploader"}
        className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700"
        appearance={{
          button:
            "font-black py-3 w-full block h-auto rounded-none after:bg-orange-500 after:h-2 after:top-0",
          label: "text-sm text-gray-500 hover:text-gray-700",
          allowedContent: "text-sm",
        }}
        onClientUploadComplete={(resp) => {
          {
            setUploadedImage(resp[0].ufsUrl);
            setValue('image', resp[0].ufsUrl);
            clearErrors('image')

          }
        }}
        content={{
          button: "Selecciona una imagen",
          label:
            "Arrastra y suelta tu imagen aquí, o haz clic para seleccionar",
          allowedContent: "Solo se permiten imágenes (max 1MB)",
        }}
        config={{
          cn: twMerge,
          mode: "auto",
        }}
      />
      {
        errors.image && <FormError>{errors.image?.message}</FormError>
      }

      {uploadedImage && (
        <>
          <p className="text-lg font-bold">Nueva imagen:</p>
          <Image
            src={uploadedImage}
            alt="Nueva imagen"
            width={300}
            height={200}
          />
        </>
      )}

      { currentImage && !uploadedImage && (
        <>
          <p className="text-lg font-bold">Imagen actual:</p>
          <Image
            src={currentImage}
            alt="IImagen actual"
            width={300}
            height={200}
          />
        </>
      )}
    </>
  );
}
