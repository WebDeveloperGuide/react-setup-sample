import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { getAuthUser } from "helper/services";

interface InitialState {
  checkUser: any;
  loading: boolean;
  userData: any;
  thankYou: any;
}

const initialState: InitialState = {
  checkUser: null,
  loading: false,
  userData: getAuthUser(),
  thankYou: null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkUser: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      checkUser: action.payload,
    }),
    setLoading: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      loading: action.payload,
    }),
    getLoginUser: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      userData: action.payload,
    }),
    setThankYou: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      thankYou: action.payload,
    }),
  },
});

export const { checkUser, setLoading, getLoginUser, setThankYou } = authSlice.actions;

export default authSlice.reducer;
