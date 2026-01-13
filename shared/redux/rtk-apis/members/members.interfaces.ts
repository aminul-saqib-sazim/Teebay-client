import { EUserRole } from "../roles/roles.enums";

export interface IUpdateMemberRoleDto {
  userId: string;
  role: EUserRole;
}
