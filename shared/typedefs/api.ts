export enum EAllowedMimeTypes {
  ApplicationPdf = "application/pdf",
  ImagePng = "image/png",
  ImageJpg = "image/jpg",
  ImageJpeg = "image/jpeg",
}

export enum EUserRole {
  SUPER_USER = "SUPER_USER",
  ADMIN = "ADMIN",
}

export interface IPresignedUrlFile {
  name: string;
  type: EAllowedMimeTypes;
}

export interface IPresignedUrlFileDto {
  files: IPresignedUrlFile[];
}

export interface IPresignedUrlResponse {
  name: string;
  signedUrl: string;
  type: EAllowedMimeTypes;
}

export interface IRegisterUserDto {
  email: string;
  /** @minLength 8 */
  password: string;
  profileInput: IUserProfileDto;
}

export interface IRoleResponse {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

export interface ISignInResponse {
  accessToken: string;
  user: ITokenizedUser;
}

export interface ITokenizedUser {
  claim: EUserRole;
  claimId: number;
  email: string;
  id: number;
  userProfileId: number;
}

export interface IUserProfileDto {
  /**
   * @minLength 2
   * @maxLength 255
   */
  firstName: string;
  /**
   * @minLength 2
   * @maxLength 255
   */
  lastName: string;
}

export interface IUserProfileResponse {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: IRoleResponse;
  updatedAt: string;
}

export interface IUserResponse {
  createdAt: string;
  email: string;
  id: number;
  updatedAt: string;
  userProfile: IUserProfileResponse;
}
