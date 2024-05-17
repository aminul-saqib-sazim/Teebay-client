export type TLoginRequestFields = {
  email: string;
  password: string;
};

export enum EUserRole {
  ADMIN = "ADMIN",
  SUPER_USER = "SUPER_USER",
}

export type TTokenizedUser = {
  id: number;
  claim: EUserRole;
  email: string;
  claimId: number;
};

export type TLoginResponse = {
  accessToken: string;
  user: TTokenizedUser;
};
