import { InsertNotification, SelectNotification } from "../types/notifications.types";
import { INotificationPusher, notificationPusher } from "./NotificationPusher";
import { INotificationRepository, notificationRepository } from "./NotificationRepository";


export interface INotificationService {
    createAndNotify(data: InsertNotification) : Promise<void>;
    getUnreadCountNotification(userId: string) : Promise<number>;
    getUserNotification(userId: string) : Promise<SelectNotification[]>;
    clearNotification(userId: string) : Promise<void>;
}

class NotificationService implements INotificationService {
    constructor(
        private notificationRepository : INotificationRepository,
        private notificationPusher : INotificationPusher
    ){}


    async createAndNotify(data: InsertNotification) {
        const notification = await this.notificationRepository.create(data);
        await this.notificationPusher.notification(notification);
    }

    async getUnreadCountNotification(userId: string) : Promise<number> {
        return this.notificationRepository.getUnreadCount(userId);
    }

    async getUserNotification(userId: string) : Promise<SelectNotification[]> {
        return await this.notificationRepository.findByUserId(userId);
    }

    async clearNotification(userId: string) : Promise<void> {
        return this.notificationRepository.delete(userId);
    }
}

export const notificationService = new NotificationService(notificationRepository, notificationPusher);