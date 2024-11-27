import { createSlice } from "@reduxjs/toolkit";
import { HostedPlaces, SearchParams } from "../types/types";
import { getAllListings, getListingById } from "./placeActions";

interface PlaceState {
  place: HostedPlaces[];
  loading: boolean;
  error: {};
  params: SearchParams;
  rooms: HostedPlaces | undefined;
}

const initialState: PlaceState = {
  place: [],
  rooms: undefined,
  error: {},
  loading: false,
  params: {
    tab_id: "home_tab",
    refinement_paths: "/homes",
    search_mode: "flex_destinations_search",
    flexible_trip_lengths: "one_week",
    location_search: "MIN_MAP_BOUNDS",
    monthly_start_date: "2024-12-01",
    monthly_length: "3",
    monthly_end_date: "2025-03-01",
    price_filter_input_type: "0",
    channel: "EXPLORE",
    date_picker_type: "calendar",
    search_type: "category_change",
    price_filter_num_nights: "5",
    category_tag: `Tiny home`,
  },
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setPlaceParams: (state, action) => {
      state.params = action.payload;
    },
    getPlaceStart: (state) => {
      state.loading = true;
      state.error = {};
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
  extraReducers: (builder) => {
    builder
      .addCase(getAllListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.place = action.payload;
        state.loading = false;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getListingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListingById.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(getListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {
  getPlaceStart,
  getPlaceSuccess,
  getPlaceFailure,
  setPlaceParams,
} = placeSlice.actions;

export default placeSlice.reducer;
