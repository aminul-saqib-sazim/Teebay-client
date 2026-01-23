import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/shared/redux/rtk-apis/orders/orders.interfaces";

export type TOrdersTableProps = {
  data: IOrder[];
  columns: ColumnDef<IOrder>[];
  onRowClick?: (order: IOrder) => void;
};
