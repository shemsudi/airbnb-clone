import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../configs/api";

export const setProfile = createAsyncThunk(
  "profile/setProfile",
  async ({
    tag,
    value,
  }: {
    tag: string;
    value: string | boolean | string[];
  }) => {
    console.log(tag, value);
    const response = await api.post("/user/profile/", { tag, value });
    console.log(response.data);

    return response.data;
  }
);
