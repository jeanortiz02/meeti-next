import { relations } from "drizzle-orm";
import { accounts, community, communityMembers, sessions, users } from "../schema";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const communityMembersRelations = relations(
  communityMembers,
  ({ one }) => ({
    community: one(community, {
      fields: [communityMembers.communityId],
      references: [community.id],
    }),
    user: one(users, {
      fields: [communityMembers.userId],
      references: [users.id],
    }),
  }),
);
