import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../configs/api.ts";
import { HostedPlaces, SearchParams } from "../types/types.tsx";

interface getAllListingsParams {
  params: SearchParams;
}

export const getAllListings = createAsyncThunk<
  HostedPlaces[],
  getAllListingsParams
>("place/getAllListings", async ({ params }) => {
  const response = await api.get("/place/getAllListings", {
    params: params,
  });
  return response.data;
});

export const getListingById = createAsyncThunk<
  HostedPlaces,
  { uuid: string | undefined }
>("place/getListingById", async ({ uuid }) => {
  const response = await api.get(`/place/getListingById/${uuid}`);
  return response.data;
});
