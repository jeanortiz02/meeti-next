import { CommunityInput } from "../schema/CommunitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";



class CommunityService {
     constructor(
        private communityRepository: ICommunityRepository
     ){}

     async createCommunity(data: CommunityInput, userId: string) {
         const response = await this.communityRepository.create({
            ...data,
            createdBy: userId,
         })
         return response;
     }
}


export const communityService = new CommunityService(communityRepository)