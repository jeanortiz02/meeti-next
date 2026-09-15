import EditForm from "@/src/features/meetis/components/EditForm";
import { meetiService } from "@/src/features/meetis/services/MeetiServices";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/dashboard/meetis/[id]/edit">): Promise<Metadata> {
  const { id } = await params;
  const meeting = await meetiService.getMeetingById(id);

  return {
    title: `Editar Meeti: ${meeting.title}`,
    description: `Editar Meeti: ${meeting.title}`,
  };
}

export default async function EditMeeti(
  props: PageProps<"/dashboard/meetis/[id]/edit">,
) {
  const { id } = await props.params;
  const { session } = await requireAuth();
  if (!session) redirect("/auth/login");
  const meeting = await meetiService.getMeetingWithPermissions(
    id,
    session.user,
  );

  if (!meeting.context.isAdmin)
    throw new Error("No estás autorizado para editar este meeti");
  return (
    <>
      <Heading>Editar Meeti: {meeting.data.title}</Heading>
      
      <Link
        href="/dashboard/meetis"
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Volver a mis meetis
      </Link>

      <EditForm meeti={meeting.data} />
    </>
  );
}
