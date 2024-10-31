import type { NextRouter } from "next/router";

import { SIGN_IN_ROUTE } from "../../constants/routes.constants";
import { clearUser } from "../../redux/reducers/user.reducer";
import projectApi from "../../redux/rtk-apis/api.config";
import { TAppDispatch } from "../../redux/store";
import { SIGN_OUT_EVENT_NAME } from "./signOut.constants";
import { ESignOutReason } from "./signOut.enums";

const emitSignOutEvent = (signOutReason: ESignOutReason) => {
  localStorage.setItem(SIGN_OUT_EVENT_NAME, signOutReason);
  localStorage.removeItem(SIGN_OUT_EVENT_NAME);
};

export const signOut = ({
  dispatch,
  router,
  reason,
  redirectRoute = SIGN_IN_ROUTE,
  shouldEmitSignOutEvent = true,
}: {
  dispatch: TAppDispatch;
  router: NextRouter;
  reason: ESignOutReason;
  redirectRoute?: string;
  shouldEmitSignOutEvent?: boolean;
}) => {
  localStorage.clear();

  dispatch(clearUser());
  dispatch(projectApi.util.resetApiState());

  if (shouldEmitSignOutEvent) {
    emitSignOutEvent(reason);
  }

  router.push(redirectRoute);
};
