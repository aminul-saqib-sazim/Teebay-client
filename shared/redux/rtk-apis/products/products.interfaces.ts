import { IUserResponse } from "../users/users.interfaces";

export enum EProductCategory {
  ELECTRONICS = "ELECTRONICS",
  FURNITURE = "FURNITURE",
  HOME_APPLIANCES = "HOME_APPLIANCES",
  SPORTING_GOODS = "SPORTING_GOODS",
  OUTDOOR = "OUTDOOR",
  TOYS = "TOYS",
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  categories: EProductCategory[];
  owner: IUserResponse;
  created_at: string;
  updated_at: string;
}

export interface IPaginatedProductsResponse {
  data: IProduct[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
