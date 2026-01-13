import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";

export interface IInvitationDetails {
  organizationName: string;
  organizationSlug: string;
  inviterEmail: string;
  role: EUserRole;
}
