"use server";

import { requireAuth } from "@/src/lib/auth-server";
import { meetiAttendeesService } from "../services/MeetiAttendeesService";
import { getClientIp } from "@/src/shared/utils/ip";
import { rateLimit } from "@/src/lib/limiter";
import { getMinutesDiffFromNow } from "@/src/shared/utils/date";

export async function toggleAttendanceAction(meetiId: string, canConfirm: boolean) {


    // rate limit
    const ip = await getClientIp();
       const { success, reset} = await rateLimit.limit(ip)
       
        if(!success) {
            return {
                error: `Demasiadas solicitudes. Intenta de nuevo en ${getMinutesDiffFromNow(reset)} minutos.`,
                success: '',
                newPermissions: {
                    canConfirm,
                    canCancel: !canConfirm
                }
            }
        }


    const { session } = await requireAuth();
    if (!session) throw new Error("Usuario no autenticado");

    return await meetiAttendeesService.toggleAttendance(meetiId, session.user);
}