import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
  name: "place",
  initialState: {
    place: null,
    loading: false,
    error: null,
  },
  reducers: {
    getPlaceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPlaceSuccess: (state, action) => {
      state.loading = false;
      state.place = action.payload;
    },
    getPlaceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getPlaceStart, getPlaceSuccess, getPlaceFailure } =
  placeSlice.actions;

export default placeSlice.reducer;
