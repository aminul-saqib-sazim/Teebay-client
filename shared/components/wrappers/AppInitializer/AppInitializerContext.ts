import { createContext, useContext } from "react";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { TTokenizedUser } from "@/shared/redux/rtk-apis/auth/auth.types";
import { useLazyMeQuery } from "@/shared/redux/rtk-apis/users/users.api";

type TSessionContext = {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  user: TTokenizedUser | null | undefined;
  getMe: ReturnType<typeof useLazyMeQuery>[0];
};

export const AppInitializerContext = createContext<TSessionContext>({
  user: null,
  isLoading: false,
  error: undefined,
} as TSessionContext);

export const useSessionContext = () => useContext(AppInitializerContext);
