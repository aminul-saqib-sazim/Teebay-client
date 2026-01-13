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
