import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../configs/api";
import { Book } from "./BookReducer";

export const BookPlace = createAsyncThunk(
  "book/bookPlace",
  async (book: Book) => {
    const response = await api.post("/book", book);
    localStorage.setItem("book", JSON.stringify(book));
    return response.data;
  }
);

export const ConfirmPayment = createAsyncThunk(
  "book/confirmPayment",
  async ({ uuid }: { uuid: string }) => {
    console.log(uuid);
    const response = await api.post("/book/paymentConfirmation", { uuid });
    return response.data;
  }
);
