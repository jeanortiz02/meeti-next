import { User } from "better-auth";
import { INotificationService, notificationService } from "../../notifications/services/NotificationService";
import { MeetiAttendeePolicy } from "../policies/MeetiAttendeePolicy";
import { IMeetiAttendeesRepository, meetiAttendeesRepository } from "./MeetiAttendeesRepository";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";


class MeetiAttendeesService {
    constructor(
        private meetiAttendeesRepository: IMeetiAttendeesRepository,
        private meetiRepository: IMeetiRepository,
        private notificationService: INotificationService
    ) {}

    async toggleAttendance(meetiId: string, user: User) {
       const meeti = await this.meetiRepository.findById(meetiId);
       if(!meeti) throw new Error("Meeti no encontrado");

       const isAttending = await this.meetiAttendeesRepository.isUserAttending(user.id, meetiId);
       

       if(MeetiAttendeePolicy.canConfirm(user, meeti, isAttending)) {
        
        await this.meetiAttendeesRepository.insert(user.id, meeti.id);

        await this.notificationService.createAndNotify({
            userId: meeti.createdBy,
            actorName: user.name,
            message: `ha confirmado su asistencia al meeti:`,
            target: meeti.title,
        })
        
        return {
            success: `Confirmaste tu asistencia al meeti: ${meeti.title}`,
            error: '',
            newPermissions: {
                canConfirm: false,
                canCancel: true,
            },
        }

       }
       if(MeetiAttendeePolicy.canCancel(user, meeti, isAttending)) {
        await this.meetiAttendeesRepository.remove(user.id, meeti.id);
        return {
            success: `Cancelaste tu asistencia al meeti: ${meeti.title}`,
            error: '',
            newPermissions: {
                canConfirm: true,
                canCancel: false,
            },
        }
       }
    }
}

export const meetiAttendeesService = new MeetiAttendeesService(
    meetiAttendeesRepository, 
    meetiRepository, 
    notificationService,
);