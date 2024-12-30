import { createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "../utils/setAuthToken.js";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  closeLoginPage,
  closeSignUp_LoginPage,
  openVerifyPage,
  closeVerifyPage,
  openLoginPage,
  openSignUpPage,
  closeSignUpPage,
} from "./ModalReducer.js";
import axios, { AxiosError, AxiosResponse } from "axios";

interface SendMessagePayload {
  phoneNumber: string;
  countryCode: string;
}

interface VerifyOtpPayload {
  phoneNumber: string;
  enteredOtp: string;
}

interface RegisterUserPayload {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  optOutMarketing: boolean;
}

interface VerifyOtpResponse {
  token: string;
  isUserExist: boolean;
}

export const sendMessage = createAsyncThunk(
  "auth/sendMessage",
  async (payload: SendMessagePayload, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/login",
        payload
      );
      if (response.status === 200) {
        dispatch(closeLoginPage());
        dispatch(openVerifyPage());
        return response.data;
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data);
      }
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload: VerifyOtpPayload, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<VerifyOtpResponse> = await axios.post(
        "http://localhost:3000/verify",
        payload
      );
      if (!response.data.isUserExist) {
        dispatch(closeVerifyPage());
        dispatch(openSignUpPage());
        return { isUserExist: false };
      } else {
        const { token, isUserExist } = response.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded: JwtPayload = jwtDecode(token);
        console.log(decoded);
        dispatch(closeVerifyPage());

        return { decoded, isUserExist };
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: RegisterUserPayload, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/complete-registration",
        formData
      );
      console.log(response);
      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded: JwtPayload = jwtDecode(token);
        dispatch(closeSignUp_LoginPage());
        dispatch(openLoginPage());
        dispatch(closeSignUpPage());
        console.log("succesfully registered");

        return { decoded };
      } else {
        console.error("Registration failed:", response);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data);
      }
    }
  }
);
