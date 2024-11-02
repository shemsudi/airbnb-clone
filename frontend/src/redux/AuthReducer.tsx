import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendMessage, verifyOtp, registerUser } from "./authAction.js";
import setAuthToken from "../utils/setAuthToken.js";
import { RootState } from "./store";

interface User {
  [key: string]: any;
}
interface AuthErrors {
  [key: string]: string;
}
interface AuthState {
  isUserAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: AuthErrors;
  token: string | null;
}

const initialState: AuthState = {
  isUserAuthenticated: false,
  loading: false,
  user: null,
  error: {},
  token: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<AuthErrors>) => {
      state.error = action.payload;
    },
    setCredentials: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isUserAuthenticated = true;
    },
    logOut: (state) => {
      setAuthToken(false);
      state.user = null;
      state.isUserAuthenticated = false;
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("currentHost");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = {};
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = {};
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log(action.payload);
        if (!action.payload.isUserExist) {
          state.error = {
            phone: "",
            phoneNumber: "User not found",
            longPhoneNumber: "",
            invalidPhoneNumber: "",
          };
        } else {
          state.isUserAuthenticated = true;
          state.user = action.payload.decoded;
          state.error = {};
        }
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserAuthenticated = true;
        state.user = action.payload;
        state.error = {};
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setCredentials, logOut, setErrors } = userSlice.actions;

export default userSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentError = (state: RootState) => state.auth.error;
export const selectLoading = (state: RootState) => state.auth.loading;
