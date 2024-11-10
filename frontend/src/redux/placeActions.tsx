import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../configs/api.ts";
import { HostedPlaces, SearchParams } from "../types/types.tsx";

interface getAllHostsParams {
  params: SearchParams;
}

export const getAllHosts = createAsyncThunk<HostedPlaces[], getAllHostsParams>(
  "place/getAllHosts",
  async ({ params }) => {
    const response = await api.get("/place/getHosts", {
      params: params,
    });
    return response.data;
  }
);
