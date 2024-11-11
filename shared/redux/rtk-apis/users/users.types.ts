import { IUpdateUserAsSuperuserDto } from "@/shared/typedefs/api";

export type TUpdateUserAsSuperuserParams = IUpdateUserAsSuperuserDto & {
  id: number;
};
