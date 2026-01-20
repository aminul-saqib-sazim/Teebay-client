import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";

export type TProductsTableProps = {
    data: IProduct[];
    columns: ColumnDef<IProduct>[];
};
