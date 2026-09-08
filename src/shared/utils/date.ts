

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'

export const formatCreatedDate = (date :Date) => {
    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: es,
    })
}

export const formatMeetingDate = (date: string, time: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute, seconds = 0] = time.split(':').map(Number);

    return formatDistanceToNow(new Date(year, month -1, day, hour, minute, seconds), {
        addSuffix: true,
        locale: es,
    })
} 