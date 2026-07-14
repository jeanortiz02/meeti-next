import { db } from "@/src/db";
import { communityMembers } from "@/src/db/schema";

export interface IMembershipRepository {
    addMember: (communityId: string, userId: string) => Promise<void>
} 

class MembershipRepository implements IMembershipRepository {
   async addMember (communityId: string, userId: string) : Promise<void>{
        await db.insert(communityMembers).values({
            communityId,
            userId
        })
    };

}

export const membershipRepository = new MembershipRepository();
