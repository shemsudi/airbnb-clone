import { createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "../utils/setAuthToken.js";
import { jwtDecode } from "jwt-decode";
import {
  closeLoginPage,
  closeSignUp_LoginPage,
  openVerifyPage,
  closeVerifyPage,
  openLoginPage,
  openSignUpPage,
  closeSignUpPage,
} from "./ModalReducer.js";
import axios, { AxiosResponse } from "axios";

interface SendMessagePayload {
  [key: string]: any;
}

interface VerifyOtpPayload {
  [key: string]: any;
}

interface RegisterUserPayload {
  [key: string]: any;
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
    } catch (error: any) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data);
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
        return response.data;
      } else {
        const { token, isUserExist } = response.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        dispatch(closeVerifyPage());
        dispatch(closeSignUp_LoginPage());
        dispatch(openLoginPage());

        return { decoded, isUserExist };
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
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
        const decoded: any = jwtDecode(token);
        dispatch(closeSignUp_LoginPage());
        dispatch(openLoginPage());
        dispatch(closeSignUpPage());
        console.log("succesfully registered");

        return decoded;
      } else {
        console.error("Registration failed:", response);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
