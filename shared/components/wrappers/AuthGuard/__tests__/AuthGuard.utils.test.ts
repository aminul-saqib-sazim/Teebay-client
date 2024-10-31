import { SIGN_IN_ROUTE } from "@/shared/constants/routes.constants";

import { getSignInUrlWithRedirectParam } from "../AuthGuard.utils";

describe("AuthGuard.utils", () => {
  describe("getSignInUrlWithRedirectParam", () => {
    it("should return sign in url with redirect param", () => {
      const urlWithRedirectParam = getSignInUrlWithRedirectParam("/test");
      const expectedUrl = new URL(SIGN_IN_ROUTE, "http://localhost/");
      expectedUrl.searchParams.append("redirect", "/test");
      expect(urlWithRedirectParam).toEqual(expectedUrl.toString());

      const urlWithRedirectParam2 = getSignInUrlWithRedirectParam("/test/2");
      const expectedUrl2 = new URL(SIGN_IN_ROUTE, "http://localhost/");
      expectedUrl2.searchParams.append("redirect", "/test/2");
      expect(urlWithRedirectParam2).toEqual(expectedUrl2.toString());

      const urlWithRedirectParam3 = getSignInUrlWithRedirectParam("/test/2?param=1");
      const expectedUrl3 = new URL(SIGN_IN_ROUTE, "http://localhost/");
      expectedUrl3.searchParams.append("redirect", "/test/2?param=1");
      expect(urlWithRedirectParam3).toEqual(expectedUrl3.toString());
    });
  });
});
