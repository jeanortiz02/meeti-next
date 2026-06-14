import { community } from "@/src/db/schema";

export type InsertCommunity = typeof community.$inferInsert;
export type SelectCommunity = typeof community.$inferSelect;