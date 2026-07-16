"use client";

import { useState } from "react";
import { CommunityPermissions } from "../types/community.types";
import { toggleMembershipAction } from "../actions/membership-actions";
import { toast } from "react-hot-toast";

type Props = {
  permissions: CommunityPermissions;
  communityId: string;
};

export default function CommunityMemberShip({
  permissions,
  communityId,
}: Props) {
  const [canJoin, setCanJoin] = useState(permissions.canJoin);

  const handleClick = async () => {
    const result = await toggleMembershipAction(communityId);

    if (result?.success) {
      toast.success(result.message);
      setCanJoin(result.newPermissions.canJoin);
    }
  };
  return (
    <>
      <button
        className={`${canJoin ? "bg-orange-500" : "bg-orange-600" } font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer`}
        onClick={handleClick}
      >
        {canJoin ? "Unirme a la comunidad" : "Abandonar la comunidad"}
      </button>
    </>
  );
}
