import { meetiService } from "@/src/features/meetis/services/MeetiServices";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/dashboard/meetis/[id]/attendes">): Promise<Metadata> {
  const { id } = await params;
  const meeting = await meetiService.getMeetingById(id);

  return {
    title: generatePageTitle(`Ver Asistentes: ${meeting.title}`),
  };
}

export default async function MeetiAttendesPage({
  params,
}: PageProps<"/dashboard/meetis/[id]/attendes">) {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/login");

  const { id } = await params;
  const { meeti, attendees } = await meetiService.getMeetingAttendes(
    id,
    session.user,
  );

  return (
    <>
      <Heading>Asistentes al meeti: {meeti.title}</Heading>

      <div className="mx-auto max-w-2xl mt-10">
        {attendees.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 dark:divide-white/5 mt-10 shadow-lg p-10"
          >
            {attendees.map(({ user }) => (
              <li className="p-5" key={user.id}>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-10 text-lg">
            No hay asistentes confirmados
          </p>
        )}
      </div>
    </>
  );
}
