import { auth } from "@/src/lib/auth";
import { ProfileInput } from "../schema/profileSchema";
import { IProfileRepository, profileRepository } from "./ProfileRepository";
import { headers } from "next/headers";


class ProfileService {

    constructor(
        private profileRepository : IProfileRepository
    ){}

    async updateProfile( data: ProfileInput) {
        const {  name, image, bio} = data;

        await auth.api.updateUser({
            body: {
                name, image, bio,
            },
            headers: await headers()
        })
    }

    async getProfileDetails(profileId: string) {
        return this.profileRepository.findFullProfileById(profileId);
    }

}

export const profileService = new ProfileService(profileRepository)