import { profileService } from "@/src/features/profile/services/ProfileService";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";


export async function generateMetadata({params} : PageProps<'/profiles/[id]'>) : Promise<Metadata> {
  
  const { id } = await params;
  
  await profileService.getProfileDetails(id);
  
  return {
    title: generatePageTitle(`Perfil de: ${''}`)
  }
  
}

export default async function ProfilePage({params} : PageProps<'/profiles/[id]'>) {
  
  const { id } = await params;

  await profileService.getProfileDetails(id);
  
  return (
    <>
        <Heading>Perfil</Heading>
    </>
    )
}
