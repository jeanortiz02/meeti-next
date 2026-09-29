import { IMeetiAttendeesRepository, meetiAttendeesRepository } from "./MeetiAttendeesRepository";


class MeetiAttendeesService {
    constructor(
        private meetiAttendeesRepository: IMeetiAttendeesRepository
    ) {}
}

export const meetiAttendeesService = new MeetiAttendeesService(meetiAttendeesRepository)