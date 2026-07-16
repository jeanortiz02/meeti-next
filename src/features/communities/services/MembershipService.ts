import { User } from "better-auth";
import { IMembershipRepository, membershipRepository } from './MembershipRepository';
import { communityRepository, ICommunityRepository } from "./CommunityRepository";
import { MemberShiPolicy } from "../policies/MembershipPolicy";


class MembershipService {
    constructor(
        private membershipRepository : IMembershipRepository,
        private communityRepository : ICommunityRepository
    ) {}


    async toggleMembership(communityId: string, user: User) {

        // Revisar si la comunidad existe
        const community = await this.communityRepository.findById(communityId);

        if(!community) return;

        const isMember = await this.membershipRepository.isMember(communityId, user.id);

        // Unirse a una comunidad
        if (MemberShiPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(community.id, user.id);

            return {
                success: true,
                message: `Te has unido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: false,
                    canLeave: true,
                },
            }
        } 

        // Permitir salirse de una comunidad 
        if( MemberShiPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(community.id, user.id)
            
            return {
                success: true,
                message: `Haz abandonado la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: true,
                    canLeave: false,
                },
            }
        }
    }

    async getJoinedCommunity(user: User) {
        await this.membershipRepository.findJoinedCommunity(user.id)
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository);