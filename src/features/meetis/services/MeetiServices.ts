import { User } from "better-auth";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";
import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { MeetiPolicy } from "../policies/MeetiPolicies";

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

  async getMeetingsUpcomingByUser(user: User) {
    const upcomingMeetings = await this.meetiRepository.findUpcomingByUser(user.id);
    
    const enriched = await Promise.all(upcomingMeetings.map( async(meeting) => {

      return {
        data: meeting,
        attendanceCount: 0,
        context: {
          isAdmin: MeetiPolicy.isAdmin(user, meeting)
        },
        permissions: {
          canViewAttends: MeetiPolicy.canViewAttends(user, meeting),
          canEdit: MeetiPolicy.canEdit(user, meeting),
          canDelete: MeetiPolicy.canDelete(user, meeting)
        }
      }
    }))

    return enriched;
  }

  async getMeetingById(meetiId: string) {
    const meeting = await this.meetiRepository.findById(meetiId);

    if(!meeting) throw new Error("Meeti no encontrado");
    
    return meeting;
  }
}

export const meetiService = new MeetiService(meetiRepository, communityRepository);
