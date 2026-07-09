"use server";
import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schema/CommunitySchema";
import { communityService } from "../services/CommunityService";
import { CheckPasswordInput, CheckPasswordSchema } from "../../auth/schema/authSchema";

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

export async function deleteCommunityAction(input: CheckPasswordInput, id: string) {
  const { session } = await requireAuth();
  if (!session) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  const data = CheckPasswordSchema.safeParse(input);

  if (!data.success) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  const response = await communityService.deleteCommunity(id, input.password, session.user);
  return response;
}
