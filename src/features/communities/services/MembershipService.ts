import { User } from "better-auth";
import {
  IMembershipRepository,
  membershipRepository,
} from "./MembershipRepository";
import {
  communityRepository,
  ICommunityRepository,
} from "./CommunityRepository";
import { MemberShiPolicy } from "../policies/MembershipPolicy";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { INotificationService, notificationService } from "../../notifications/services/NotificationService";

class MembershipService {
  constructor(
    private membershipRepository: IMembershipRepository,
    private communityRepository: ICommunityRepository,
    private notificationService: INotificationService,
  ) {}

  async toggleMembership(communityId: string, user: User) {
    // Revisar si la comunidad existe
    const community = await this.communityRepository.findById(communityId);

    if (!community) return;

    const isMember = await this.membershipRepository.isMember(
      communityId,
      user.id,
    );

    // Unirse a una comunidad
    if (MemberShiPolicy.canJoin(user, community, isMember)) {
      await this.membershipRepository.addMember(community.id, user.id);

      // Crear la notificación
       await this.notificationService.createAndNotify({
        userId: community.createdBy,
        actorName: user.name,
        message: 'Se unió a tu comunidad',
        target: community.name,
      })

      return {
        success: true,
        message: `Te has unido a la comunidad ${community.name}`,
        newPermissions: {
          canJoin: false,
          canLeave: true,
        },
      };
    }

    // Permitir salirse de una comunidad
    if (MemberShiPolicy.canLeave(user, community, isMember)) {
      await this.membershipRepository.removeMember(community.id, user.id);

      return {
        success: true,
        message: `Haz abandonado la comunidad ${community.name}`,
        newPermissions: {
          canJoin: true,
          canLeave: false,
        },
      };
    }
  }

  async getJoinedCommunity(user: User) {
    const joined = await this.membershipRepository.findJoinedCommunity(user.id);

    const enriched = await Promise.all(
      joined.map(async({community}) => {
        const isMember = true;
        const isAdmin = CommunityPolicy.isAdmin(user, community);
        const memberCount = await this.membershipRepository.getMemberCount(community.id);
        const canEdit = CommunityPolicy.canEdit(user, community);
        const canDelete = CommunityPolicy.canDelete(user, community);
        const canViewMembers = CommunityPolicy.canViewMembers(user, community);
        const canJoin = MemberShiPolicy.canJoin(user, community, isMember);
        const canLeave = MemberShiPolicy.canLeave(user, community, isMember);

        return {
          data: community,
          memberCount,
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
}

export const membershipService = new MembershipService(
  membershipRepository,
  communityRepository,
  notificationService,
);
