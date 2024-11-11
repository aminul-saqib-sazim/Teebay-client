import { TDataTableProps } from "@/shared/typedefs";
import { ISuperuserUserResponse } from "@/shared/typedefs/api";

export type TUsersTableProps = TDataTableProps<ISuperuserUserResponse, unknown> & {
  test?: string;
};
