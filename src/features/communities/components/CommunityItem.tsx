import type { CommunityWithPermissions } from '../types/community.types'
type Props = {
    community : CommunityWithPermissions
}

export default function CommunityItem( { community} : Props) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex items-start min-w-0 gap-x-4">
        <div className="size-32 flex-none overflow-hidden">
          <img
            alt={`Imagen Comunidad `}
            className="object-cover w-full h-full"
            width={250}
            height={250}
          />
        </div>
        <div className="min-w-0 flex-auto">
          <a href={``} className="hover:underline font-bold text-lg">
          </a>
          <p className="text-gray-600 text-sm"></p>
          <p className="text-gray-600 text-sm"></p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        {/* DROPDOWN MENU */}
      </div>
    </li>
  )
}