import { db } from "@/src/db";
import { InsertMeeti, SelectMeeti } from '../types/meeti.types';
import { meeti, meetiLocations } from "@/src/db/schema";
import { format } from "date-fns";

export interface IMeetiRepository {
    insert(input: InsertMeeti): Promise<void>
    findUpcomingByUser(userId: string): Promise<SelectMeeti[]>
    findById(id: string): Promise<SelectMeeti | null>
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
    
    async findUpcomingByUser(userId: string): Promise<SelectMeeti[]> {
         const today = format(new Date(), 'yyyy-MM-dd');
        
         const result = await db.query.meeti.findMany({
            where: ( meeting, { and, eq, gte} ) => {
                and(
                    eq(meeting.createdBy, userId),
                    gte(meeting.date, today)
                )
            },

            orderBy: (meeting, { asc }) => asc(meeting.date),
         })
         return result;

    }

    async findById(id: string) {
        const result = await db.query.meeti.findFirst({
            where: (meeting, { eq }) => eq(meeting.id, id)
        })
        return result ?? null;
    }

}

export const meetiRepository = new MeetiRepository();