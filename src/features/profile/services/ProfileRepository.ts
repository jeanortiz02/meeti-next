import { db } from "@/src/db";
import { User } from "../../auth/types/auth.types";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface IProfileRepository {
    findById(userId: string) : Promise<User>
}

class ProfileRepository implements IProfileRepository {
    async findById(userId: string): Promise<User> {
         const [result] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
         return result;
    }
}

export const profileRepository = new ProfileRepository();