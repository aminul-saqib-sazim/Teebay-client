export interface IAdminFindAllUserResponse {
  data: IUserResponse[];
  meta: IPaginationMetadataResponse;
}

export interface IAdminUpdateUserDto {
  /** @minLength 8 */
  password?: string;
  roleId?: number;
  state?: EUserState;
}

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

export enum EUserState {
  UNREGISTERED = "UNREGISTERED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum EVerificationRequestStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

export enum EVerificationRequestType {
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  RESET_PASSWORD = "RESET_PASSWORD",
}

export interface IFindAllUsersParams {
  /**
   * @min 1
   * @default 10
   */
  limit: number;
  /**
   * @min 1
   * @default 1
   */
  page: number;
}

export interface IFindOneVerificationRequestParams {
  token: string;
  type: string;
}

export interface IForgotPasswordDto {
  /** @format email */
  email: string;
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

export interface IRegisterUserDto {
  /** @format email */
  email: string;
  /** @minLength 8 */
  password: string;
  userProfile: IUserProfileDto;
}

export interface IResetPasswordDto {
  /** @minLength 8 */
  password: string;
}

export interface IRoleResponse {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

export interface ISelfRegisterUserDto {
  /** @format email */
  email: string;
  /** @minLength 8 */
  password: string;
  userProfile: ISelfRegisterUserProfileDto;
}

export interface ISelfRegisterUserProfileDto {
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

export interface ISendForgotPasswordEmailResponse {
  message: string;
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

export interface IUpdateUserProfileDto {
  /**
   * @minLength 2
   * @maxLength 255
   */
  firstName?: string;
  /**
   * @minLength 2
   * @maxLength 255
   */
  lastName?: string;
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
  roleId: number;
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

export interface IVerificationRequestResponse {
  /** @format date-time */
  createdAt: string;
  id: number;
  status: EVerificationRequestStatus;
  token: string;
  type: EVerificationRequestType;
  /** @format date-time */
  updatedAt: string;
  user: {
    id: number;
  };
}

export interface IVerifyByTokenResponse {
  message: string;
}

export interface IVerifyParams {
  token: string;
  type: string;
}
