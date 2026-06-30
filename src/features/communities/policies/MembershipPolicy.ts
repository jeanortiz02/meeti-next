import { User } from "better-auth";
import { SelectCommunity } from "../types/community.types";


export class MemberShiPolicy {
    static canJoin( user: User, community: SelectCommunity, isMember : boolean) : boolean {
        // Si es miembro no se puede unir 
        if ( isMember ) return false;
        
        // Si es admin no se puede unir
        if( community.createdBy === user.id) return false;

        return true;
    }

    static canLeave( user: User, community: SelectCommunity, isMember : boolean) : boolean {
        
        // Si es admin no se puede salir
        if( community.createdBy === user.id) return false;

        return isMember;
    }
}