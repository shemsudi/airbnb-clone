import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../configs/api.ts";
import { Location } from "../types/types.tsx";
export const updateHostStructure = createAsyncThunk(
  "host/setStructure",
  async ({ uuid, structure }: { uuid: string; structure: string }) => {
    console.log(uuid);
    const response = await api.post("/host/structure", {
      uuid: uuid,
      structure: structure,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      lastPage: "structure",
      structure: structure,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return response.data;
  }
);

export const updatePrivacyType = createAsyncThunk(
  "host/setPrivacyType",
  async ({ uuid, privacyType }: { uuid: string; privacyType: string }) => {
    const response = await api.post("/host/privacyType", {
      uuid: uuid,
      privacyType: privacyType,
    });

    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      lastPage: "location",
      privacyType: privacyType,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return response.data;
  }
);
interface LocationParams {
  uuid: string;
  location: Location;
}
export const updateLocation = createAsyncThunk<LocationParams, LocationParams>(
  "host/setLocation",
  async ({ uuid, location }) => {
    const response = await api.post("/host/location", {
      uuid: uuid,
      location: location,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      lastPage: "floorPlan",
      location: location,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return response.data;
  }
);

interface FloorPlanParams {
  uuid: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}
interface FloorPlanResponse {
  uuid: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}
export const updateFloorPlan = createAsyncThunk<
  FloorPlanResponse,
  FloorPlanParams
>("host/setFloorPlan", async ({ uuid, guests, bedrooms, beds, bathrooms }) => {
  await api.post<FloorPlanResponse>("/host/floor-plan", {
    uuid: uuid,
    guests: guests,
    bedrooms: bedrooms,
    beds: beds,
    bathrooms: bathrooms,
  });
  const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
  const updatedHost = {
    ...currentHost,
    lastPage: "floorPlan",
    guests: guests,
    bedrooms: bedrooms,
    beds: beds,
    bathrooms: bathrooms,
  };
  localStorage.setItem("currentHost", JSON.stringify(updatedHost));
  return { uuid, guests, bedrooms, beds, bathrooms };
});

interface updateAmenitiesParams {
  uuid: string;
  amenities: string[];
  safetyAmenities: string[];
  uniqueAmenities: string[];
}
export const updateAmenities = createAsyncThunk<
  updateAmenitiesParams,
  updateAmenitiesParams
>(
  "host/setAmenities",
  async ({ uuid, amenities, safetyAmenities, uniqueAmenities }) => {
    const response = await api.post("/host/amenities", {
      uuid,
      amenities,
      uniqueAmenities,
      safetyAmenities,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      lastPage: "photos",
      amenities: amenities,
      uniqueAmenities: uniqueAmenities,
      safetyAmenities: safetyAmenities,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return response.data;
  }
);

export const removeImageRedux = createAsyncThunk(
  "host/removeImage",
  async ({ uuid, index }: { uuid: string; index: number }) => {
    await api.delete(`/host/deletePhoto/${index}`, {
      params: { uuid: uuid },
    });
    return { uuid, index };
  }
);

interface uploadFilesParams {
  tempFiles: File[];
  uuid: string;
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  files: string[];
}

export const uploadFiles = createAsyncThunk<
  { newFiles: string[] },
  uploadFilesParams
>("host/uploadFiles", async ({ tempFiles, uuid, setFiles, files }) => {
  const formdata = new FormData();
  console.log(tempFiles);
  formdata.append("uuid", uuid);
  tempFiles.forEach((file) => formdata.append("photos", file));
  const result = await api.post("/host/addPhotos", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const urlFiles: string[] = result.data.photos;
  console.log(urlFiles);
  setFiles([...files, ...urlFiles]);
  const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
  const updatedHost = {
    ...currentHost,
    lastPage: "title",
    photos: [...(currentHost.photos || []), ...urlFiles],
  };
  localStorage.setItem("currentHost", JSON.stringify(updatedHost));

  return { newFiles: urlFiles };
});

export const updateTitle = createAsyncThunk(
  "host/updateTitle",
  async ({ uuid, title }: { uuid: string; title: string }) => {
    await api.post("/host/title", {
      title,
      uuid: uuid,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      title: title,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return { title, uuid };
  }
);

interface updateDescriptionParams {
  uuid: string;
  description: string;
  highlights: string[];
}

export const updateDescription = createAsyncThunk<
  updateDescriptionParams,
  updateDescriptionParams
>("host/updateDescription", async ({ uuid, description, highlights }) => {
  console.log(uuid, description, highlights);
  await api.post("/host/description", {
    uuid: uuid,
    description: description,
    highlights: highlights,
  });

  const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
  const updatedHost = {
    ...currentHost,
    description: description,
    highlights: highlights,
  };
  localStorage.setItem("currentHost", JSON.stringify(updatedHost));
  return {
    uuid,
    description,
    highlights,
  };
});

export const updateInstantBook = createAsyncThunk(
  "host/updateInstantBook",
  async ({ uuid, instantBook }: { uuid: string; instantBook: string }) => {
    await api.post("/host/instant-book", {
      uuid: uuid,
      instantBook: instantBook,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      instantBook: instantBook,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return {
      uuid,
      instantBook,
    };
  }
);

export const updateVisibility = createAsyncThunk(
  "host/updateVisibility",
  async ({ uuid, visibility }: { uuid: string; visibility: string }) => {
    await api.post("/host/visibility", {
      uuid: uuid,
      visibility: visibility,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      visibility: visibility,
      lastPage: "price",
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));

    return {
      visibility,
      uuid,
    };
  }
);

export const updatePrice = createAsyncThunk(
  "host/updatePrice",
  async ({ uuid, price }: { uuid: string; price: number }) => {
    await api.post("/host/price", {
      uuid: uuid,
      price: price,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    const updatedHost = {
      ...currentHost,
      price: price,
      lastPage: "discount",
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));

    return {
      price,
      uuid,
    };
  }
);

interface updateDiscountsParams {
  uuid: string;
  discount: {
    isWeeklyDiscountEnabled: boolean;
    isMonthlyDiscountEnabled: boolean;
    isNewLPDiscountEnabled: boolean;
    newLPDiscount: number;
    weeklyDiscount?: number | undefined;
    monthlyDiscount?: number | undefined;
  };
}

export const updateDiscounts = createAsyncThunk<
  updateDiscountsParams,
  updateDiscountsParams
>("host/updateDiscounts", async ({ uuid, discount }) => {
  await api.post("/host/setDiscount", {
    uuid: uuid,
    discount: discount,
  });
  const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
  const updatedHost = {
    ...currentHost,
    discount: discount,
    lastPage: "legal",
  };
  localStorage.setItem("currentHost", JSON.stringify(updatedHost));
  return {
    discount,
    uuid,
  };
});

interface updateLegalInfoParams {
  uuid: string;
  legalInfo: {
    hostingType: string;
    securityCameras: { isAvailable: boolean; description: string };
    noiseMonitors: boolean;
    weapons: boolean;
  };
}

export const updateLegalInfo = createAsyncThunk<
  updateLegalInfoParams,
  updateLegalInfoParams
>("host/updateLegalInfo", async ({ uuid, legalInfo }) => {
  await api.post("/host/setLegalInfo", {
    uuid: uuid,
    legalInfo,
  });
  const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
  const updatedHost = {
    ...currentHost,
    legalInfo,
  };
  localStorage.setItem("currentHost", JSON.stringify(updatedHost));

  return {
    uuid,
    legalInfo,
  };
});
