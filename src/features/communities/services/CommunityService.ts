import { checkPassword } from "@/src/shared/utils/auth";
import { User } from "better-auth";
import { notFound } from "next/navigation";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MemberShiPolicy } from "../policies/MembershipPolicy";
import { CommunityInput } from "../schema/CommunitySchema";
import {
  communityRepository,
  ICommunityRepository,
} from "./CommunityRepository";
import { deleteUTFiles } from "@/src/lib/uploadthing-server";

class CommunityService {
  constructor(private communityRepository: ICommunityRepository) {}

  async createCommunity(data: CommunityInput, userId: string) {
    const response = await this.communityRepository.create({
      ...data,
      createdBy: userId,
    });
    return response;
  }

  async getUserCommunities(user: User) {
    const communities = await this.communityRepository.findByUser(user.id);

    const enriched = await Promise.all(
      communities.map((community) => {
        const isMember = true;
        const isAdmin = CommunityPolicy.isAdmin(user, community);
        const canEdit = CommunityPolicy.canEdit(user, community);
        const canDelete = CommunityPolicy.canDelete(user, community);
        const canViewMembers = CommunityPolicy.canViewMembers(user, community);
        const canJoin = MemberShiPolicy.canJoin(user, community, isMember);
        const canLeave = MemberShiPolicy.canLeave(user, community, isMember);

        return {
          data: community,
          context: {
            isMember,
            isAdmin,
          },
          permission: {
            canEdit,
            canDelete,
            canViewMembers,
            canJoin,
            canLeave,
          },
        };
      }),
    );

    return enriched;
  }

  async getCommunity(communityId: string) {
    const community = await this.communityRepository.findById(communityId);
    if (!community) notFound();
    return community;
  }

  async getCommunityDetails(communityId: string, user?: User) {
    const community = await this.getCommunity(communityId);

    if (!user) {
        return {
          data: community,
          context: null,
          permission: null,
        }
    }


    const isMember = false;
    const isAdmin = CommunityPolicy.isAdmin(user, community);
    const canEdit = CommunityPolicy.canEdit(user, community);
    const canDelete = CommunityPolicy.canDelete(user, community);
    const canViewMembers = CommunityPolicy.canViewMembers(user, community);
    const canJoin = MemberShiPolicy.canJoin(user, community, isMember);
    const canLeave = MemberShiPolicy.canLeave(user, community, isMember);

    return {
      data: community,
      context: {
        isMember,
        isAdmin,
      },
      permission: {
        canEdit,
        canDelete,
        canViewMembers,
        canJoin,
        canLeave,
      },
    };
  }

  async updateCommunity(data: CommunityInput, communityId: string, user: User) {
    const community = await this.getCommunity(communityId);

    if (!CommunityPolicy.canEdit(user, community)) {
      throw new Error("No tienes permisos para editar esta comunidad");
    }

    await this.communityRepository.update(data, communityId);
  }

  async deleteCommunity(communityId: string, password: string, user: User) {
    // Obtener comunidad
    const community = await this.getCommunity(communityId);

    // Verificar permisos
    if (!CommunityPolicy.canDelete(user, community)) {
      throw new Error("No tienes permisos para eliminar esta comunidad");
    }

    // Verificar el password del usuario
    const isValidPassword = await checkPassword(password);
    if (!isValidPassword) {
      return {
        error: "El password es incorrecto",
        success: "",
      };
    }

    // Eliminar la comunidad
    await this.communityRepository.delete(communityId);
    await deleteUTFiles(community.image);

    return {
      error: "",
      success: "Comunidad eliminada correctamente",
    };
  }
}

export const communityService = new CommunityService(communityRepository);
