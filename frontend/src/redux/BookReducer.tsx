import { createSlice } from "@reduxjs/toolkit";
import { BookPlace, ConfirmPayment } from "./BookActions";

export type Book = {
  userId: string;
  reservationId: string;
  guests: number;
  startDate: Date;
  endDate: Date;
  totalAmount: number | undefined;
  serviceFee: number | undefined;
};

type BookState = {
  book: Book | null;
  loading: boolean;
  error: string | null;
};

const initialState: BookState = {
  book: null,
  loading: false,
  error: null,
};

const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },

    fetchBookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBookSuccess: (state, action) => {
      state.loading = false;
      state.book = action.payload;
    },
    fetchBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BookPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BookPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(BookPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(ConfirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ConfirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(ConfirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setBook, fetchBookStart, fetchBookSuccess, fetchBookFailure } =
  BookSlice.actions;

export default BookSlice.reducer;
