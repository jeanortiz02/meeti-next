import { db } from "@/src/db";
import { User } from "../types/auth.types";


export interface IAuthRepository {
    userExists: (email: string) => Promise<User | undefined>;
}

class AuthRepository implements IAuthRepository {
    async userExists(email: string) {
        return await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        })

    }
}

export const authRepository = new AuthRepository();
