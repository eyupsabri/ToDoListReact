import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  authanticated: boolean;
};

const initialState: AuthState = {
  authanticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthState>) => {
      state.authanticated = action.payload.authanticated;

      // console.log("is admin from state management", action.payload.isAdmin);
    },
  },
});

export default authSlice.reducer;

export const { setAuthentication } = authSlice.actions;
