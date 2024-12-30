import { createSlice } from "@reduxjs/toolkit";
import { setProfile } from "./profileActions";

const ProfileReducer = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: {},
  },
  reducers: {
    setProfileStart: (state) => {
      state.loading = true;
      state.error = {};
    },
    setProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    setProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProfile.pending, (state) => {
        state.loading = true;
        state.error = {};
      })
      .addCase(setProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(setProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default ProfileReducer.reducer;
