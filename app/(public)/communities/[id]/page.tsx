import CommunityActionsPanel from "@/src/features/communities/components/CommunityActionsPanel";
import { communityService } from "@/src/features/communities/services/CommunityService";
import getAuthServerSession from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import Image from "next/image";

export default async function CommunityPage(
  props: PageProps<"/communities/[id]">,
) {
  const { id } = await props.params;
  const session = await getAuthServerSession();
  const community = await communityService.getCommunityDetails(
    id,
    session?.user,
  );
  return (
    <>
      <main className="max-w-7xl mx-auto space-y-5 p-10 lg:p-0 mt-10">
        {community.permission && (
          <CommunityActionsPanel
            permissions={community.permission}
            communityId={id}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-10">
          <div className="lg:col-span-2 space-y-5">
            <div className="relative size-64 mx-auto aspect-square overflow-hidden rounded-full">
              <Image
                src={community.data.image}
                alt={`Imagen de la comunidad: ${community.data.image}`}
                width={600}
                height={600}
                className="object-cover size-64"
                priority
              />
            </div>
            <Heading>{community.data.name}</Heading>
            <p className="text-lg text-gray-600">
              {community.data.description}
            </p>
          </div>
          <div className="bg-slate-100 p-5 rounded-2xl">{/* Admin Aquí */}</div>
        </div>
      </main>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10 max-w-7xl mx-auto mt-10 space-y-5">
        {/* Próximos Meetis Aquí */}
      </div>
    </>
  );
}
