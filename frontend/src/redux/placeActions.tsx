import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../configs/api.ts";

interface getAllHostsParams {
  params: {
    structure: string;
  };
}

export const getAllHosts = createAsyncThunk<{}, getAllHostsParams>(
  "place/getAllHosts",
  async ({ params }) => {
    const response = await api.get("/place/getHosts", {
      params: params,
    });
    return response.data;
  }
);
