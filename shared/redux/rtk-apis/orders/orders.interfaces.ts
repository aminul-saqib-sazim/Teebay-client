import { IProduct } from "../products/products.interfaces";
import { IUserResponse } from "../users/users.interfaces";

export enum EOrderType {
  BUY = "BUY",
  RENT = "RENT",
}

export enum EOrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IOrder {
  id: string;
  product: IProduct;
  buyer: IUserResponse;
  type: EOrderType;
  status: EOrderStatus;
  price: number;
  quantity?: number;
  rentStartDate?: string;
  rentEndDate?: string;
  createdAt: string;
}
