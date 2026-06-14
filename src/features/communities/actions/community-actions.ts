"use server";
import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schema/CommunitySchema";
import { communityService } from "../services/CommunityService";

export async function createCommunityAction(input: CommunityInput) {
  const data = CommunitySchema.safeParse(input);

  if (!data.success) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  const { session } = await requireAuth();
  if (!session) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  await communityService.createCommunity(data.data, session.user.id);

  return {
    error: "",
    success: "Comunidad creada correctamente",
  }
}
