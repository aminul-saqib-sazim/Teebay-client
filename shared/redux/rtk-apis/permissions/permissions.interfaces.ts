import { EPermission } from "@/shared/typedefs";

export interface ICheckPermissionsRequest {
  permissions: Record<string, EPermission[]>;
}

export interface ICheckPermissionsResponse {
  hasPermission: boolean;
}
