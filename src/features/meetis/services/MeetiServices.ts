import { User } from "better-auth";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { MeetiPolicy } from "../policies/MeetiPolicy";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiAttendeesRepository, meetiAttendeesRepository } from './MeetiAttendeesRepository';
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";
import { MeetiAttendeePolicy } from "../policies/MeetiAttendeePolicy";

class MeetiService {
  constructor(
    private meetiRepository: IMeetiRepository, 
    private communityRepository : ICommunityRepository,
    private meetiAttendeesRepository: IMeetiAttendeesRepository,
  ) {}

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
      const attendanceCount = await this.meetiAttendeesRepository.findAttendeesCount(meeting.id);
      return {
        data: meeting,
        attendanceCount,
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

  async getMeetingWithDetail(meetiId: string, user?: User) {
    const meeti = await this.meetiRepository.findFullById(meetiId);

    if(!meeti) throw new Error('Meeti no encontrado');
    
    if(!user) throw new Error ('Usuario....');
    const isAttending = await this.meetiAttendeesRepository.isUserAttending(user.id, meeti.id);
    const isAdmin = MeetiPolicy.isAdmin(user, meeti);
    const isPastMeeti = MeetiPolicy.isPastMeeti(meeti);

    return {
      data: meeti,
      context: {
        isAdmin,
        isPastMeeti,
      },
      permissions: {
        canConfirm: MeetiAttendeePolicy.canConfirm(user, meeti, isAttending),
        canCancel: MeetiAttendeePolicy.canCancel(user, meeti, isAttending),
      }
    }
  }

  async getMeetingWithPermissions(meeitId: string, user: User) {
    const meeting = await this.getMeetingById(meeitId);

    return {
      data: meeting,
      context: {
        isAdmin : MeetiPolicy.isAdmin(user, meeting)
      },
      permissions: {
        canViewAttends: MeetiPolicy.canViewAttends(user, meeting),
        canEdit: MeetiPolicy.canEdit(user, meeting),
        canDelete: MeetiPolicy.canDelete(user, meeting)
      }
    }
  }

  async updateMeeting(meetiId: string, data: MeetiInput, user: User) {
    const community = await communityRepository.findById(data.communityId);

    if( !community || !CommunityPolicy.isAdmin(user, community)) {
        throw new Error('No tienes permiso')
    }

    const meeti = await this.getMeetingWithPermissions(meetiId, user);
    if(!meeti.permissions.canEdit) {
      throw new Error('No autorizado')
    }

    await this.meetiRepository.update({...data, createdBy: user.id}, meeti.data.id)
  }
}

export const meetiService = new MeetiService(meetiRepository, communityRepository, meetiAttendeesRepository);
