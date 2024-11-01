import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TRootState } from "@/shared/redux/store";
import { EUserRole, ITokenizedUser } from "@/shared/typedefs/api";

interface IAuthenticatedUser {
  userId: number | null;
  email: string | null;
  claim: EUserRole | null;
  claimId: number | null;
}

const initialState: IAuthenticatedUser = {
  userId: 1,
  email: null,
  claimId: null,
  claim: null,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ITokenizedUser>) => {
      state.email = action.payload.email;
      state.claimId = action.payload.claimId;
      state.claim = action.payload.claim as EUserRole;
      state.userId = action.payload.id;
    },

    clearUser: (state) => {
      state.email = null;
      state.claimId = null;
      state.claim = null;
      state.userId = null;
    },
  },
});

export const { setUser, clearUser } = authenticatedUserSlice.actions;

export const selectUserId = (state: TRootState) => state.authenticatedUser.userId;

export default authenticatedUserSlice.reducer;
