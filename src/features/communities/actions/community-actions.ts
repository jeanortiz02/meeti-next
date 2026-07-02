"use server";
import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schema/CommunitySchema";
import { communityService } from "../services/CommunityService";

export async function createCommunityAction(input: CommunityInput) {
  const { session } = await requireAuth();
  if (!session) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  const data = CommunitySchema.safeParse(input);

  if (!data.success) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }
  await communityService.createCommunity(data.data, session.user.id);

  return {
    error: "",
    success: "Comunidad creada correctamente",
  };
}

export async function editCommunityAction(
  input: CommunityInput,
  communityId: string,
) {
  const { session } = await requireAuth();
  if (!session) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  const data = CommunitySchema.safeParse(input);

  if (!data.success) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  await communityService.updateCommunity(data.data, communityId, session.user);

  return {
    success: "Comunidad actualizada correctamente",
    error: "",
  };
}
