import { db } from "@/src/db";
import {
  InsertMeeti,
  InsertMeetiLocation,
  SelectMeeti,
} from "../types/meeti.types";
import { meeti, meetiLocations } from "@/src/db/schema";
import { format } from "date-fns";
import { eq } from "drizzle-orm";

export interface IMeetiRepository {
  insert(input: InsertMeeti): Promise<void>;
  insertLocation(data: InsertMeetiLocation): Promise<void>;
  findUpcomingByUser(userId: string): Promise<SelectMeeti[]>;
  findById(id: string): Promise<SelectMeeti | null>;
  update(data: InsertMeeti, meetiId: string): Promise<void>;
}

class MeetiRepository implements IMeetiRepository {
  async insert(input: InsertMeeti) {
    const [insertedMeeti] = await db.insert(meeti).values(input).returning();

    if (!insertedMeeti.virtual && input.location) {
      await db.insert(meetiLocations).values({
        ...input.location,
        meetiId: insertedMeeti.id,
      });
    }
  }

  async insertLocation(data: InsertMeetiLocation) {
    await db.insert(meetiLocations).values(data);
  }

  async findUpcomingByUser(userId: string): Promise<SelectMeeti[]> {
    const today = format(new Date(), "yyyy-MM-dd");

    const result = await db.query.meeti.findMany({
      where: (meeting, { and, eq, gte }) => {
        and(eq(meeting.createdBy, userId), gte(meeting.date, today));
      },

      orderBy: (meeting, { asc }) => asc(meeting.date),
    });
    return result;
  }

  async findById(id: string) {
    const result = await db.query.meeti.findFirst({
      where: (meeting, { eq }) => eq(meeting.id, id),
      with: {
        location: true,
      },
    });
    return result ?? null;
  }

  async update(data: InsertMeeti, meetiId: string): Promise<void> {
    const [updatedMeeti] = await db
      .update(meeti)
      .set(data)
      .where(eq(meeti.id, meetiId))
      .returning();

    // Actualizar ubicación solo si el event es virtual
    if (!updatedMeeti.virtual && data.location) {
      const locationExists = await db.query.meetiLocations.findFirst({
        where: (meetiLocation, { eq }) =>
          eq(meetiLocations.meetiId, updatedMeeti.id),
      });

      if (locationExists) {
        await db
          .update(meetiLocations)
          .set(data.location)
          .where(eq(meetiLocations.meetiId, updatedMeeti.id));
      } else {
        await this.insertLocation({
          ...data.location,
          meetiId: updatedMeeti.id,
        });
      }
    }
  }
}

export const meetiRepository = new MeetiRepository();
