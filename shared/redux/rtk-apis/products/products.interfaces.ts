import { IBackendPaginationMeta, IUserResponse } from "../users/users.interfaces";

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

export interface ICreateProductDto {
    title: string;
    description: string;
    price: number;
    quantity: number;
    categories: EProductCategory[];
}

export interface IUpdateProductDto extends Partial<ICreateProductDto> { }

export interface IGetProductsParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: EProductCategory;
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
