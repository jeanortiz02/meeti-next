import { meetiService } from "@/src/features/meetis/services/MeetiServices";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: PageProps<"/meetis/[id]">): Promise<Metadata> {
  const { id } = await params;
  const meeti = await meetiService.getMeetingById(id);

  return {
    title: generatePageTitle(`${meeti.title}`),
    openGraph: {
      title: `Meeti: ${meeti.title}`,
      siteName: "Meeti",
      images: [
        {
          url: meeti.image,
          width: 1000,
          height: 600,
          alt: `Imagen del meeti: ${meeti.title}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `Meeti: ${meeti.title}`,
      description: "Únete a este meeti",
      images: [meeti.image],
    },
  };
}

export default async function MeetiPage(props: PageProps<"/meetis/[id]">) {
  const { id } = await props.params;
  const meeti = await meetiService.getMeetingWithDetail(id);

  return (
    <>
      <nav className="py-5 border-b border-gray-200 px-5 lg:px-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-3  items-start lg:flex-row lg:justify-between lg:gap-0">
          <p className=" text-gray-600">Categoría: {''}
            <Link
              href={`/categories/${meeti.data.category.id}`}
              className="font-bold"
            >
            {meeti.data.category.name}
            </Link>
          </p>
          <p className=" text-gray-600">Comunidad: {''}

            <Link
              href={`/communities/${meeti.data.community.id}`}
              className="font-bold"
            >
            {meeti.data.community.name}
            </Link>
          </p>
        </div>
      </nav>

      <Heading className="text-center mt-10">{meeti.data.title}</Heading>
      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 p-5 lg:px-0 mt-10">
        <section className="lg:col-span-2">
          <Image
            src={meeti.data.image}
            alt={`Imagen del meeti: ${meeti.data.title}`}
            width={800}
            height={600}
            priority
          />
          <p className="mt-5 text-lg">{meeti.data.details}</p>
        </section>

        <aside className="bg-slate-100 rounded-2xl">
          <section className="space-y-5 p-10 "></section>
        </aside>
      </main>
    </>
  );
}
