import type { NextRouter } from "next/router";

import { mockDeep } from "jest-mock-extended";

import { SIGN_IN_ROUTE } from "../../constants/routes.constants";
import { clearUser } from "../../redux/reducers/user.reducer";
import projectApi from "../../redux/rtk-apis/api.config";
import { ESignOutReason, SIGN_OUT_EVENT_NAME, signOut } from "../signOut";

jest.mock("../../redux/reducers/user.reducer", () => ({
  clearUser: jest.fn(),
}));

jest.mock("../../redux/rtk-apis/api.config", () => ({
  util: {
    resetApiState: jest.fn(),
  },
}));

const mockDispatch = jest.fn();
const mockRouter = mockDeep<NextRouter>({ funcPropSupport: true });

describe("signOut", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should clear localStorage", () => {
    localStorage.setItem("test", "value");
    signOut({
      dispatch: mockDispatch,
      router: mockRouter,
      reason: ESignOutReason.UserSignedOut,
    });
    expect(localStorage.getItem("test")).toBeNull();
  });

  it("should dispatch clearUser and resetApiState", () => {
    signOut({
      dispatch: mockDispatch,
      router: mockRouter,
      reason: ESignOutReason.UserSignedOut,
    });
    expect(mockDispatch).toHaveBeenCalledWith(clearUser());
    expect(mockDispatch).toHaveBeenCalledWith(projectApi.util.resetApiState());
  });

  it("should emit sign out event if shouldEmitSignOutEvent is true", () => {
    signOut({
      dispatch: mockDispatch,
      router: mockRouter,
      reason: ESignOutReason.UserSignedOut,
      shouldEmitSignOutEvent: true,
    });
    expect(localStorage.getItem(SIGN_OUT_EVENT_NAME)).toBeNull();
  });

  it("should not emit sign out event if shouldEmitSignOutEvent is false", () => {
    signOut({
      dispatch: mockDispatch,
      router: mockRouter,
      reason: ESignOutReason.UserSignedOut,
      shouldEmitSignOutEvent: false,
    });
    expect(localStorage.getItem(SIGN_OUT_EVENT_NAME)).toBeNull();
  });

  it("should redirect to the specified route", () => {
    const redirectRoute = "/custom-route";
    signOut({
      dispatch: mockDispatch,
      router: mockRouter,
      reason: ESignOutReason.UserSignedOut,
      redirectRoute,
    });
    expect(mockRouter.push).toHaveBeenCalledWith(redirectRoute);
  });

  it("should redirect to SIGN_IN_ROUTE if no redirectRoute is specified", () => {
    signOut({
      dispatch: mockDispatch,
      router: mockRouter,
      reason: ESignOutReason.UserSignedOut,
    });
    expect(mockRouter.push).toHaveBeenCalledWith(SIGN_IN_ROUTE);
  });
});
