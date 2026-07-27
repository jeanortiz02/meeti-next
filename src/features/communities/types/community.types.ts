import { community, communityMembers } from "@/src/db/schema";
import { User } from "../../auth/types/auth.types";


export type InsertCommunity = typeof community.$inferInsert;
export type SelectCommunity = typeof community.$inferSelect;
export type SelectCommunityMembers = typeof communityMembers.$inferSelect;
export type JoinedCommunity = SelectCommunityMembers & {
  community: SelectCommunity,
  user: User
}

export type CommunityPermissions = {
  canEdit: boolean;
  canDelete: boolean;
  canViewMembers: boolean;
  canJoin: boolean;
  canLeave: boolean;
};

export type CommunityContext = {
  isMember: boolean;
  isAdmin: boolean;
};


export type CommunityWithPermissions = {
    data : SelectCommunity,
    memberCount: number,
    context: CommunityContext,
    permission: CommunityPermissions,
}