import { User } from "better-auth";
import { CommunityInput } from "../schema/CommunitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MemberShiPolicy } from "../policies/MembershipPolicy";



class CommunityService {
     constructor(
        private communityRepository: ICommunityRepository
     ){}

     async createCommunity(data: CommunityInput, userId: string) {
         const response = await this.communityRepository.create({
            ...data,
            createdBy: userId,
         })
         return response;
     }

     async getUserCommunities( user: User) {
      const communities = await this.communityRepository.findByUser(user.id);

      const enriched = await Promise.all(communities.map((community) => {

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
               isAdmin
            },
            permission: {
               canEdit,
               canDelete,
               canViewMembers,
               canJoin,
               canLeave,
            }
         }
      }))

      return enriched;
     }
}


export const communityService = new CommunityService(communityRepository)