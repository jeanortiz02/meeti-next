import { db } from "@/src/db";
import { meetiAttendees } from "@/src/db/schema";
import { and, eq, count } from "drizzle-orm";
import { SelectMeetiAttendeesWithUser } from "../types/meeti.types";

export interface IMeetiAttendeesRepository {
  isUserAttending(userId: string, meetiId: string): Promise<boolean>;
  insert(userId: string, meetiId: string): Promise<void>;
  remove(userId: string, meetiId: string): Promise<void>;
  findAttendeesCount(meetiId: string): Promise<number>;
  findAttendesByMeetiId(
    meetiId: string,
  ): Promise<SelectMeetiAttendeesWithUser[]>;
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository {
  async isUserAttending(userId: string, meetiId: string): Promise<boolean> {
    const result = await db.query.meetiAttendees.findFirst({
      where: (meetiAttendees, { and, eq }) =>
        and(
          eq(meetiAttendees.meetiId, meetiId),
          eq(meetiAttendees.userId, userId),
        ),
    });

    return !!result;
  }

  async insert(userId: string, meetiId: string) {
    await db.insert(meetiAttendees).values({ userId, meetiId });
  }

  async remove(userId: string, meetiId: string) {
    await db
      .delete(meetiAttendees)
      .where(
        and(
          eq(meetiAttendees.meetiId, meetiId),
          eq(meetiAttendees.userId, userId),
        ),
      );
  }

  async findAttendeesCount(meetiId: string) {
    const [result] = await db
      .select({ total: count() })
      .from(meetiAttendees)
      .where(eq(meetiAttendees.meetiId, meetiId));

    return result.total;
  }

  async findAttendesByMeetiId(meetiId: string) : Promise<SelectMeetiAttendeesWithUser[]> {
    const result = await db.query.meetiAttendees.findMany({
      where: (meetiAttendees, { eq }) => eq(meetiAttendees.meetiId, meetiId),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email:true
          }
        },
      },
    });

    return result;
  }
}
export const meetiAttendeesRepository = new MeetiAttendeesRepository();
