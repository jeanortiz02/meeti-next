import { db } from "@/src/db";

export interface IMeetiAttendeesRepository {
  isUserAttending(userId: string, meetiId: string): Promise<boolean>;
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
}

export const meetiAttendeesRepository = new MeetiAttendeesRepository();
