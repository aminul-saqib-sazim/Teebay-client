import { createContext, useContext } from "react";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { useLazyMeQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { ITokenizedUser } from "@/shared/typedefs/api";

type TSessionContext = {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  user: ITokenizedUser | null | undefined;
  getMe: ReturnType<typeof useLazyMeQuery>[0];
};

export const AppInitializerContext = createContext<TSessionContext>({
  user: null,
  isLoading: false,
  error: undefined,
} as TSessionContext);

export const useSessionContext = () => useContext(AppInitializerContext);
