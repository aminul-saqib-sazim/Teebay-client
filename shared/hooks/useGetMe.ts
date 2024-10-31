import { useState, useCallback } from "react";

import { toast } from "sonner";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../constants/app.constants";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/reducers/user.reducer";
import { useLazyMeQuery } from "../redux/rtk-apis/users/users.api";
import { parseApiErrorMessage } from "../utils/errors";
import { getFromLocalStorage } from "../utils/localStorage";

export const useGetMe = () => {
  const dispatch = useAppDispatch();
  const [getMe, { isFetching, isLoading, error, data, isUninitialized }] = useLazyMeQuery();
  const [isGettingCurrentUser, setIsGettingCurrentUser] = useState(
    isFetching || isLoading || isUninitialized,
  );

  const getMeOnLoad = useCallback(async () => {
    const accessToken = getFromLocalStorage<string>(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    if (!accessToken) {
      setIsGettingCurrentUser(false);
      return;
    }

    try {
      const userData = await getMe().unwrap();

      dispatch(setUser(userData));
    } catch (err) {
      const errorMessage = parseApiErrorMessage(err);

      toast("Something went wrong", {
        description: errorMessage,
      });
    } finally {
      setIsGettingCurrentUser(false);
    }
  }, [dispatch, getMe]);

  return {
    isLoading: isGettingCurrentUser,
    error,
    user: data,
    getMe,
    getMeOnLoad,
  };
};
