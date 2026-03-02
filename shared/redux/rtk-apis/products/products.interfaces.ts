import { IUserResponse } from "../users/users.interfaces";

export enum EProductCategory {
  ELECTRONICS = "ELECTRONICS",
  FURNITURE = "FURNITURE",
  HOME_APPLIANCES = "HOME_APPLIANCES",
  SPORTING_GOODS = "SPORTING_GOODS",
  OUTDOOR = "OUTDOOR",
  TOYS = "TOYS",
}

export enum ERentOption {
  HOURLY = "HOURLY",
  DAILY = "DAILY",
}

export enum EProductListingType {
  BUY = "BUY",
  RENT = "RENT",
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  rentalPrice: number;
  rentOption?: ERentOption;
  quantity: number;
  categories: string[];
  owner: IUserResponse;
  created_at: string;
  updated_at: string;
}

export interface ICreateProductDto {
  title: string;
  description: string;
  price: number;
  rentalPrice: number;
  rentOption?: ERentOption;
  quantity: number;
  categories: EProductCategory[];
}

export interface IUpdateProductDto extends Partial<ICreateProductDto> {}

export interface IGetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: EProductCategory;
  listingType?: EProductListingType;
  minPrice?: number;
  maxPrice?: number;
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

export interface ICategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IGetCategoriesResponse {
  data: ICategory[];
}
