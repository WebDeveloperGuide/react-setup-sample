import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  message: null | string;
  status: null | boolean;
  type: null | string;
}

const initialState: InitialState = {
  message: null,
  status: null,
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationFail: (state: Draft<InitialState>, action: PayloadAction<string>) => ({
      ...state,
      status: false,
      message: action.payload,
    }),
    notificationSuccess: (state: Draft<InitialState>, action: PayloadAction<string>) => ({
      ...state,
      status: true,
      message: action.payload,
    }),
    notificationClear: (state: Draft<InitialState>) => ({
      ...state,
      message: null,
      status: null,
      type: null,
    }),
  },
});

export const { notificationFail, notificationSuccess, notificationClear } =
  notificationSlice.actions;

export default notificationSlice.reducer;
