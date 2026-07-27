import { db } from "@/src/db";
import {
  InsertNotification,
  SelectNotification,
} from "../types/notifications.types";
import { notifications } from "@/src/db/schema";

export interface INotificationRepository {
  create(data: InsertNotification): Promise<SelectNotification>;
}

class NotificationRepository implements INotificationRepository {
  async create(data: InsertNotification): Promise<SelectNotification> {
    const [result] = await db.insert(notifications).values(data).returning();

    return result;
  }
}

export const notificationRepository = new NotificationRepository();
