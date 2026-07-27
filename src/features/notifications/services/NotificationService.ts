import { SelectNotification } from "../types/notifications.types";
import { INotificationRepository, notificationRepository } from "./NotificationRepository";


class NotificationService {
    constructor(
        private notificationRepository : INotificationRepository
    ){}

    async getUnreadCountNotification(userId: string) : Promise<number> {
        return this.notificationRepository.getUnreadCount(userId);
    }

    async getUserNotification(userId: string) : Promise<SelectNotification[]> {
        return await this.notificationRepository.findByUserId(userId);
    }
}

export const notificationService = new NotificationService(notificationRepository);