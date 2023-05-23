import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "store/slices/authSlice";
import { notificationSuccess, notificationFail } from "store/slices/notificationSlice";
import Messages from "helper/messages";
import apiClient from "config/apiClient";

export const loginUser = createAsyncThunk("loginUser", async (_request: any, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await apiClient().post(`login`, _request);
    console.log("response:", response);
    dispatch(setLoading(false));
    if (response?.data?.token) {
      localStorage.setItem("user_data", JSON.stringify(response?.data?.token));
      dispatch(notificationSuccess(Messages.SUCCESS.LOGIN));
      window.location.replace("/dashboard");
    } else {
      dispatch(notificationFail(response?.data?.message || Messages.ERROR.LOGIN));
    }
  } catch (error: any) {
    dispatch(setLoading(false));
    dispatch(notificationFail(error?.response?.data?.message || Messages.ERROR.LOGIN));
  }
});

export const register = createAsyncThunk("register", (_request: any, { dispatch }) => {
  dispatch(notificationFail("test"));
});
