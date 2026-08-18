import { db } from "@/src/db";
import { InsertMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/src/db/schema";

export interface IMeetiRepository {
    insert(input: InsertMeeti): Promise<void>
}

class MeetiRepository implements IMeetiRepository {
    async insert(input: InsertMeeti){
        const [insertedMeeti] = await db.insert(meeti).values(input).returning();
        
        if( !insertedMeeti.virtual && input.location) {
            await db.insert(meetiLocations).values({
                ...input.location,
                meetiId: insertedMeeti.id
            })
        }
    }

}

export const meetiRepository = new MeetiRepository();