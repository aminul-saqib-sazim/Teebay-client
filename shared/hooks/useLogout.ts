import { useCallback } from "react";

import { useRouter } from "next/router";

import { useAppDispatch } from "../redux/hooks";
import { clearUser } from "../redux/reducers/user.reducer";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    localStorage.clear();
    dispatch(clearUser());
    router.reload();
  }, [router, dispatch]);

  return { logout };
};
