import { db } from "@/src/db";
import { User } from "../../auth/types/auth.types";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { FullProfile } from "../types/profile.types";

export interface IProfileRepository {
    findById(userId: string) : Promise<User>
    findFullProfileById(userId: string) : Promise<FullProfile | undefined>
}

class ProfileRepository implements IProfileRepository {
    async findById(userId: string): Promise<User> {
         const [result] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
         return result;
    }
    async findFullProfileById(userId: string) : Promise<FullProfile | undefined> {
        const result = await db.query.users.findFirst({
            where: (user, {eq}) => eq(user.id, userId)
            
        })

        return result;
    }
}

export const profileRepository = new ProfileRepository();