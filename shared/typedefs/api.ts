export interface IChangePasswordDto {
  currentPassword: string;
  /** @minLength 8 */
  newPassword: string;
}

export enum EAllowedMimeTypes {
  ApplicationPdf = "application/pdf",
  ImagePng = "image/png",
  ImageJpg = "image/jpg",
  ImageJpeg = "image/jpeg",
}

export enum EUserState {
  UNREGISTERED = "UNREGISTERED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IPaginationMetadataResponse {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPresignedUrlFile {
  name: string;
  type: EAllowedMimeTypes;
}

export interface IPresignedUrlFileDto {
  /** @minItems 1 */
  files: IPresignedUrlFile[];
}

export interface IPresignedUrlResponse {
  name: string;
  signedUrl: string;
  type: EAllowedMimeTypes;
}

export interface IVerifyParams {
  token: string;
  type: string;
}

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
