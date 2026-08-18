import { User } from "better-auth";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";
import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";

class MeetiService {
  constructor(
    private meetiRepository: IMeetiRepository, 
    private communityRepository : ICommunityRepository) {}

  async createMeeti(input: MeetiInput, user: User) {
    const community = await communityRepository.findById(input.communityId);

    if( !community || !CommunityPolicy.isAdmin(user, community)) {
        throw new Error('No tienes permiso')
    }

    await this.meetiRepository.insert({...input, createdBy: user.id})
  }
}

export const meetiService = new MeetiService(meetiRepository, communityRepository);
