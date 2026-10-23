import { profileService } from "@/src/features/profile/services/ProfileService";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import { cache } from "react";

const getProfileDataDetailsCache = cache( async (id: string) => {
  return await profileService.getProfileDetails(id);
})


export async function generateMetadata({params} : PageProps<'/profiles/[id]'>) : Promise<Metadata> {
  
  const { id } = await params;
  const profile = await getProfileDataDetailsCache(id);
  
  
  return {
    title: generatePageTitle(`Perfil de: ${profile?.name}`),
    openGraph: {
      title: `Perfil: ${profile?.name}`,
      siteName: "Perfil",
      images: [
        {
          url: profile?.image ?? `${process.env.APP_URL}/default.jpg`,
          width: 1000,
          height: 600,
          alt: `Imagen de Perfil: ${profile?.name}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `Perfil: ${profile?.name}`,
      description: "Te invito a ver mi perfil",
      images: [profile?.image ?? `${process.env.APP_URL}/default.jpg`],
    },
  }
  
}

export default async function ProfilePage({params} : PageProps<'/profiles/[id]'>) {
  
  const { id } = await params;

  const profile = await getProfileDataDetailsCache(id);
  
  return (
    <>
        <Heading>Perfil</Heading>
    </>
    )
}
