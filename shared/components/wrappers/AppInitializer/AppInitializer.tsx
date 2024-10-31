import { PropsWithChildren, useEffect } from "react";

import { useGetMe } from "@/shared/hooks/useGetMe";
import { useSubscribeToLocalStorageEvents } from "@/shared/hooks/useSubscribeToLocalStorageEvents";

import { AppInitializerContext } from "./AppInitializerContext";

const AppInitializer = ({ children }: PropsWithChildren) => {
  const { isLoading, error, user, getMe, getMeOnLoad } = useGetMe();

  useSubscribeToLocalStorageEvents();

  useEffect(() => {
    getMeOnLoad();
  }, [getMeOnLoad]);

  return (
    <AppInitializerContext.Provider
      value={{
        isLoading,
        error,
        user,
        getMe,
      }}
    >
      {children}
    </AppInitializerContext.Provider>
  );
};

export default AppInitializer;
