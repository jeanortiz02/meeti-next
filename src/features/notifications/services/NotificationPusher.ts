import { pusher } from "@/src/lib/pusher";
import { SelectNotification } from "../types/notifications.types";


export interface INotificationPusher {
    notification(notification: SelectNotification): Promise<void>;
}

class NotificationPusher implements INotificationPusher {
    
    async notification(notification: SelectNotification): Promise<void> {
        await pusher.trigger(`notifications-channel-${notification.userId}`, 'new-notification', notification);
    }

}


export const notificationPusher = new NotificationPusher();